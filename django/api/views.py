import logging
from rest_framework import generics
from .serializers import FeedSerializer, FeedItemSerializer, UserSerializer, CategorySerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.models import User, Group

from .models import Feed, FeedItem, Category
from rest_framework.decorators import api_view, detail_route
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


from rest_framework import renderers

logger = logging.getLogger(__name__)


# class CreateFeedView(generics.ListCreateAPIView):
#     """This class defines the create behavior of our rest api."""
#     queryset = Feed.objects.all()
#     serializer_class = FeedSerializer
#
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#
#     def perform_create(self, serializer):
#         """Save the post data when creating a new bucketlist."""
#         serializer.save(owner=self.request.user)
#
#
# class DetailsFeedView(generics.RetrieveUpdateDestroyAPIView):
#     """This class handles the http GET, PUT and DELETE requests."""
#
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
#
#     queryset = Feed.objects.all()
#     serializer_class = FeedSerializer
#
#
#
# class FeedViewSet(viewsets.ModelViewSet):
#     queryset = Feed.objects.all()
#     serializer_class = FeedSerializer
#
#
# class FeedsHighlight(generics.GenericAPIView):
#     queryset = Feed.objects.all()
#     renderer_classes = (renderers.StaticHTMLRenderer,)
#
#     def get(self, request, *args, **kwargs):
#         feed = self.get_object()
#         return Response(feed.highlighted)


class FeedViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class CatViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class FeedItemViewSet(generics.ListCreateAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = FeedItem.objects.all()
    serializer_class = FeedItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = FeedItem.objects.all()
    serializer_class = FeedItemSerializer



@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'feeds': reverse('feed-list', request=request, format=format),
        'items': reverse('item-list', request=request, format=format),
        'cats':  reverse('category-list',  request=request, format=format)
    })


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


    def perform_create(self, serializer):
        serializer.save()