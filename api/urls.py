from django.conf.urls import url

from . import views

app_name = 'rss_api'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^dr_rss/$', views.feeds, name='feeds'),
    url(r'^feed/(?P<feed_id>[0-9]+)/$', views.feed, name='feed'),
    url(r'^feed/(?P<feed_id>[0-9]+)/item$', views.item, name='item'),
    url(r'^category/(?P<feed_id>[0-9]+)/$', views.category, name='category'),
]