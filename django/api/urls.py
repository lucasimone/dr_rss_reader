from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns, include
from rest_framework import routers

from .views import CatViewSet, FeedItemViewSet, FeedViewSet, UserViewSet, ItemViewSet, api_root, UserView

feed_list = FeedViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

feed_detail = FeedViewSet.as_view({
    'get':      'retrieve',
    'put':      'update',
    'patch':    'partial_update',
    'delete':   'destroy'
})

user_list = UserViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

user_detail = UserViewSet.as_view({
    'get':      'retrieve',
    'put':      'update',
    'patch':    'partial_update',
    'delete':   'destroy'
})

cat_list = CatViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

cat_detail = CatViewSet.as_view({
    'get':      'retrieve',
    'put':      'update',
    'patch':    'partial_update',
    'delete':   'destroy'
})


item_list = ItemViewSet.as_view({
    'get':      'retrieve',
    'post':     'update',
    'delete':   'destroy',
    'patch':    'partial_update'
})


account = UserView.as_view({
    'get':      'list',
    'post':     'create',
    'patch':    'partial_update',
    'delete':   'destroy'
})

router = routers.DefaultRouter()
router.register(r'accounts', UserView, 'list')


#app_name = 'rss_api'
urlpatterns = [

    url(r'^$', api_root),
    url(r'^feeds/$', feed_list, name='feed-list'),
    url(r'^feeds/(?P<pk>[0-9]+)/$', feed_detail, name='feed-detail'),

    # USERS
    url(r'^users/$', user_list, name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',  user_detail, name='user-detail'),
    url(r'^account/', account, name="account"),

    # FEED ITEMS
    url(r'^items/$', FeedItemViewSet.as_view(), name='item-list'),
    url(r'^items/(?P<pk>[0-9]+)/$$', item_list, name='item-update'),
    #url(r'^items/(?P<pk>[0-9]+)/$', item_list, name='item-list'),

    # CATEGORY
    url(r'^category/$', cat_list,  name='category-list'),
    url(r'^category/(?P<pk>[0-9]+)/$', cat_detail, name='category-detail')



]

urlpatterns = format_suffix_patterns(urlpatterns)