# api/serializers.py

from rest_framework import serializers
from .models import Feed, FeedItem, Category
from django.contrib.auth.models import User


class FeedSerializer(serializers.ModelSerializer):
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
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = FeedItem

        fields = ('id', 'title', 'link', 'content', 'owner', 'tags',
                  'feed', 'read', 'guid', 'date_fetched', 'pub_date')

        read_only_fields = ('date_fetched', 'pub_date')


class UserSerializer(serializers.ModelSerializer):

    #feeds = serializers.HyperlinkedRelatedField(many=True, view_name='feed-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'is_staff', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


    def perform_create(self, serializer):
        serializer.save()




class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'owner', 'tags')

    def perform_create(self, serializer):
         serializer.save(owner=self.request.user)


class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'username', 'first_name', 'last_name', 'email', 'url')
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined',)

    def create(self, validated_data):
        # call set_password on user object. Without this
        # the password will be stored in plain text.
        user = super(UserSerializer2, self).create(validated_data)
        print  (validated_data['password'])
        user.set_password(validated_data['password'])
        user.save()

        return user