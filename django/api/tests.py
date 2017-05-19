from django.test import TestCase
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status
from django.core.urlresolvers import reverse
from rest_framework.test import APIRequestFactory, APIClient
from rest_framework.authtoken.models import Token
from .models import Feed, FeedItem, Category



# Define this after the ModelTestCase
class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        self.response = None
        self.user = User.objects.create_user('testuser', email='testuser@test.com', password='testing')
        self.user.save()
        self.factory = APIRequestFactory()
        self.client = APIClient()
        self.client.login(username=self.user.username, password=self.user.password)




    # def test_create_feed_api(self):
    #
    #     self.assertEqual(self.user.username, 'testuser')
    #     self.feed_data = {'url': 'http://rss.cnn.com/rss/cnn_topstories.rss'}
    #
    #     self.response = self.client.post(
    #         reverse('feed-list'),
    #         self.feed_data,
    #         format="json")
    #     self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)


    def test_api_can_get_a_feed(self):
        """Test the api can get a given Feed."""
        for feed in Feed.objects.all():
            self.response = self.client.get(
                    reverse('item-list'),
                    kwargs={'pk', feed.id},
                    format="json")

            self.assertEqual(self.response.status_code, status.HTTP_200_OK)
            self.assertNotEquals(self.response.body, "")



    def test_api_can_update_feed(self):

        for feed in Feed.objects.all():
            change_feed = {'title': "UPDATED %s" %feed.title}
            res = self.client.put(
                reverse('detail', kwargs={'pk': feed.id}),
                change_feed, format='json'
            )
            self.assertEqual(res.status_code, status.HTTP_200_OK)


    def test_api_can_delete_feed(self):
        """Test the api can delete a bucketlist."""
        for feed in Feed.objects.all():
            self.response = self.client.delete(
                reverse('feed-detail', kwargs={'id': feed.id}),
                format='json',
                follow=True)

            self.assertEquals(self.response.status_code, status.HTTP_204_NO_CONTENT)





class FeedModelTest(TestCase):

    """This class defines the test suite for the bucketlist model."""

    def setUp(self):
        self.user = User.objects.create_user('testuser', email='testuser@test.com', password='testing')
        self.user.save()

    def test_string_representation(self):
        entry = Feed(url="http://rss.cnn.com/rss/cnn_topstories.rss")
        self.assertEqual(str(entry), entry.url)

    def test_verbose_name_plural(self):
        self.assertEqual(str(Feed._meta.verbose_name_plural), "feeds")

    def test_update_feed(self):
        feed = Feed(url='http://rss.cnn.com/rss/cnn_topstories.rss', owner=self.user)
        feed.save()
        feed.update(force=True)
        self.assertEqual(FeedItem.objects.all().count(), 20)

    def test_mark_as_read(self):
        feed = Feed(url='http://rss.cnn.com/rss/cnn_topstories.rss', owner=self.user)
        feed.save()
        feed.update(force=True)
        self.assertEqual(FeedItem.objects.un_read().count(), 20)
        for item in FeedItem.objects.un_read():
            item.mark_as_read()
        self.assertEqual(FeedItem.objects.un_read().count(), 0)

    def test_multiple_users_same_feed(self):
        user1 = User(username="user1")
        user1.set_unusable_password()
        user2 = User(username="user2")
        user2.set_unusable_password()

        user1.save()
        user2.save()

        feed_url = 'http://rss.cnn.com/rss/cnn_topstories.rss'
        feed1 = Feed(owner=user1, url=feed_url)
        feed2 = Feed(owner=user2, url=feed_url)
        try:
            feed1.save()
            feed2.save()
        except IntegrityError:
            self.fail("Couldn't add %s for both %s and %s" % (feed_url, user1, user2))

        self.assertIsNotNone(feed1.pk)
        self.assertIsNotNone(feed2.pk)

    def test_category_representation(self):
        cat = Category(name="CatA", owner=self.user)
        cat.save()
        self.assertEqual(cat.name, str(cat))

    def test_category(self):


        cat = Category(name="CatA", owner=self.user)
        cat.save()
        self.assertEqual(cat.name, str(cat))

        feed_url = 'http://rss.cnn.com/rss/cnn_topstories.rss'
        feed1 = Feed(owner=self.user, url=feed_url, category=cat)

        self.assertEqual(feed1.category.name, str(cat))




