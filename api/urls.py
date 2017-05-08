from django.conf.urls import url

from . import views

app_name = 'rss_api'
urlpatterns = [
    url(r'^$', views.index, name='index'),
]