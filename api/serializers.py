# api/serializers.py

from rest_framework import serializers
from .models import Feed, FeedItem, Category
from django.contrib.auth.models import User


class FeedSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Feed

        fields = ('url', 'id', 'link', 'url', 'title', 'category', 'last_update', 'owner')

        read_only_fields = ('link', 'last_update')


    def perform_create(self, serializer):
         serializer.save(owner=self.request.user)



class FeedItemSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = FeedItem

        fields = ('id', 'title', 'link', 'content',
                  'feed', 'read', 'guid', 'date_fetched', 'pub_date')

        read_only_fields = ('date_fetched', 'pub_date')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    feeds = serializers.HyperlinkedRelatedField(many=True, view_name='feed-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'email', 'is_staff', 'feeds')

    def perform_create(self, serializer):
         serializer.save()




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'owner', 'tags')
        read_only_fields = ('slug', )

