"""
Django Dr_RSS_Reader
Managers.py
Author: Luca Lamorte
"""

from __future__ import unicode_literals
import datetime

from django.db.models.query import QuerySet
from django.db.models import Manager


class FeedItemQuerySet(QuerySet):
    def my_feed_items(self, owner):
        return self.filter(feed__owner=owner)

    def category(self, category_slug):
        return self.filter(feed__category__slug=category_slug)

    def un_read(self):
        return self.filter(read=False)

    def read(self):
        return self.filter(read=True)

    def yesterday(self):
        return self.filter(date_fetched=datetime.date.today() - datetime.timedelta(1))


class FeedItemManager(Manager):
    def get_queryset(self):
        return FeedItemQuerySet(self.model, using=self._db)

    def category(self, category_slug):
        return self.get_queryset().category(category_slug)

    def my_feed_items(self, owner):
        return self.get_queryset().my_feed_items(owner)

    def un_read(self):
        return self.get_queryset().un_read()

    def read(self):
        return self.get_queryset().read()

    def yesterday(self):
        return self.get_queryset().yesterday()