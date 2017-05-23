import feedparser
import datetime

from time import mktime

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible

from .managers import FeedItemManager

@python_2_unicode_compatible
class Category(models.Model):
    """
        Category model
    """
    name = models.CharField(max_length=250, blank=False)
    #slug = models.SlugField(blank=True, null=True, editable=False)
    #user = models.ForeignKey(User, blank=True, null=True)
    tags = models.CharField(max_length=250, blank=True)

    #owner = models.ForeignKey('auth.User', related_name='category', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, null=True, blank=True)


    @property
    def get_unread_count(self):
        """
        Fetch the unread count for a given category.
        :return:
        """
        return FeedItem.objects.my_feed_items(self.owner).category(self.slug).un_read().count()

    def __str__(self):
        return self.name


    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        """
        Updated Save to slug the name.
        :param args:
        :param kwargs:
        :return:
        """

        super(Category, self).save(*args, **kwargs)



@python_2_unicode_compatible
class Feed(models.Model):
    """
        Feed Model
    """
    link    = models.CharField(blank=True, max_length=450)
    url     = models.CharField(blank=True, max_length=450)
    title   = models.CharField(blank=True, null=True, max_length=250)


    category = models.ForeignKey(Category, blank=True, null=True)

    owner = models.ForeignKey('auth.User', related_name='feeds', on_delete=models.CASCADE)

    last_update = models.DateField(blank=True, null=True, editable=False)

    class Meta:
        unique_together = (
            ("url", "owner"),
        )
        ordering = ['last_update']

    def __str__(self):
        return self.url

    def _get_title(self):
        """
        Fetch the title from the feed.
        :return:
        """
        parser = feedparser.parse(self.url)
        return parser.feed.title



    def save(self, *args, **kwargs):
        """
        Updated .save() method.  Fetches the title
        from the feed, and updates the record timestamp.
        :param args:
        :param kwargs:
        :return:
        """

        if not self.title:
            self.title = self._get_title()

        if not self.category:
            cat = Category(name=self.title.replace(" ", "_"), tags="default", owner=self.owner)
            cat.save()
            self.category = cat

        super(Feed, self).save(*args, **kwargs)
        if self.last_update is None:
            self.update(force=True)

    @property
    def get_unread_count(self):
        """
        Fetch the unread count for all items in this feed.
        :return int count of un-read items:
        """
        return FeedItem.objects.filter(feed=self).un_read().count()

    def _update_feed(self):
        """
        Perform an update on this feed.  This fetches the latest
        data from the feed and compares it to what we have stored currently.
        Then we go ahead and save that content and mark it as
        un-read.
        """
        # Update the last update field
        counter = 0
        feed = feedparser.parse(self.url)
        self.last_update = datetime.date.today()
        if "link" in feed.feed:
            self.link = feed.feed.link
        else:
            self.link = ""
        self.save()
        for item in feed.entries[:20]:
        #for item in feed.entries:
            # The RSS spec doesn't require the guid field so fall back on link
            if "id" in item:
                guid = item.id
            else:
                guid = item.link

            # Search for an existing item
            try:
                FeedItem.objects.get(guid=guid)
            except FeedItem.DoesNotExist:
                # Create it.
                counter += 1
                if "published_parsed" in item:
                    pub_date = datetime.datetime.fromtimestamp(mktime(item.published_parsed))
                elif "updated_parsed" in item:
                    pub_date = datetime.datetime.fromtimestamp(mktime(item.updated_parsed))
                else:
                    pub_date = datetime.datetime.today()

                pub_date = timezone.make_aware(pub_date, timezone.get_current_timezone())

                feed_item = FeedItem(title=item.title,
                                     link=item.link,
                                     content=item.description,
                                     guid=guid,
                                     pub_date=pub_date,
                                     feed=self)

                feed_item.save()
        return counter

    def _update_processor(self):
        """
        Kick off the processing of the feeds.  Either update with celery
        or in real time if we aren't using Celery.
        :return:
        """
        if getattr(settings, 'FEED_UPDATE_CELERY', False):
            from .tasks import update_feed
            update_feed.delay(self)
            return True
        self._update_feed()
        return True

    def update(self, force=False):
        """
        If we aren't forcing it
        and its not the same day, go ahead
        and update the feeds.
        """

        if force or not force and self.last_update < datetime.date.today():
            self._update_processor()
            return True

    # @models.permalink
    # def get_absolute_url(self):
    #     """
    #     Feed permalink
    #     :return:
    #     """
    #     return ('feedme-feed-list-by-feed', (), {'feed_id': self.id})


@python_2_unicode_compatible
class FeedItem(models.Model):
    """
    FeedItem Model
    """
    title = models.CharField(max_length=350, blank=True)
    link = models.URLField(blank=True)
    content = models.TextField(blank=True)
    feed = models.ForeignKey(Feed, blank=True, null=True)
    read = models.BooleanField(default=False)
    guid = models.CharField(max_length=255)
    date_fetched = models.DateField(auto_created=True, auto_now_add=True, editable=True)
    pub_date = models.DateTimeField()
    tags = models.CharField(max_length=255, blank=True)

    objects = FeedItemManager()

    class Meta:
        ordering = ['-pub_date']

    def __str__(self):
        return "%s - %s\n" %(self.pub_date, self.title)

    def mark_as_read(self):
        """
        Mark an item as read.
        """
        self.read = True
        self.save()

