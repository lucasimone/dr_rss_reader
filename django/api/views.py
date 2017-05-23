import logging
from rest_framework import generics
from .serializers import FeedSerializer, FeedItemSerializer, UserSerializer, CategorySerializer, UserSerializer2
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.contrib.auth.models import User, Group

from .models import Feed, FeedItem, Category
from rest_framework.decorators import api_view, detail_route
from rest_framework import permissions, request
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import list_route
from rest_framework.permissions import AllowAny
from rest_framework import renderers
from .permissions import IsStaffOrTargetUser

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
sh = logging.StreamHandler()
sh.setLevel(logging.DEBUG)
logger.addHandler(sh)

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


    def get_queryset(self):
        try:
            if "update" in self.request.GET :
                logger.debug("UPDATE: %s" %self.request.GET['update'])
                if self.request.GET['update']:
                    count = 0
                    for item in self.queryset:
                        count += item._update_feed()

                    logger.debug('Updated feeds with {num} new entries'.format(num=count))
                else:
                    logger.debug('No Update required!')
            else:
                logger.debug('No Update in parameters!')

            if self.request.user:
                return self.queryset.filter(owner=self.request.user)
            else:
                return self.queryset
        except Exception as ex:
            print("THis request is not valid:")

        return Fee.objects.all()


class CatViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class FeedItemViewSet(generics.ListCreateAPIView):


    """This class handles the http GET, PUT and DELETE requests."""
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)
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


######## NEW USER CREATION

class UserView(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer2
    model = User

    def get_permissions(self):
        # allow non-authenticated user to create via POST
        return (AllowAny() if self.request.method == 'POST'
                else IsStaffOrTargetUser()),
