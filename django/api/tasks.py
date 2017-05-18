from __future__ import unicode_literals
from celery.task import task


@task(name='update_feeds')
def update_feed(feed):
    feed._update_feed()


@task(name='update_all_feeds')
def update_all_feeds():
    from .models import Feed
    for feed in Feed.objects.all():
        feed._update_feed()


@task(name='send_digest')
def send_digest():
    import digest
    digest.send_digest()