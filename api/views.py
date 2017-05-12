import logging
from django.http import HttpResponse, JsonResponse
from collections import OrderedDict

from .models import Feed, FeedItem

logger = logging.getLogger(__name__)


def index(request):
    base_url = request.build_absolute_uri('/api/')
    output = OrderedDict()
    output["name"]  = "DR_RSS_READER"
    output["ver"]   = "1.0.0"
    output["api"] = []
    output["api"].append("%s" % base_url)
    output["api"].append("%sfeed" % base_url)
    output["api"].append("%sfeed/0" %base_url)
    output["api"].append("%sitem/0" %base_url)
    output["api"].append("%scategory/0"%base_url)

    return JsonResponse(dict(output))


def feeds(request):
    output = dict()
    output["name"] = "DR_RSS_READER"
    output["ver"] = "1.0.0"
    output["feeds"] = []
    for feed in Feed.objects.all():
        print(feed)
        output["feeds"].append({"name": feed.url, "title": feed.title})

    return JsonResponse(output)


def feed(request, feed_id):
    return HttpResponse("You're looking at feed %s." % feed_id)


def item(request, feed_id):
    return HttpResponse("You're looking at item %s." % feed_id)


def category(request, feed_id):
    return HttpResponse("You're looking at the category %s." % feed_id)

