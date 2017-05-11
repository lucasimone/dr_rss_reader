from django.contrib import admin

from .models import Feed, Category, FeedItem

admin.site.register(Feed)
admin.site.register(FeedItem)
admin.site.register(Category)