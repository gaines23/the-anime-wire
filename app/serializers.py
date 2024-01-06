from rest_framework import serializers
from django.contrib.auth.models import User
from datetime import datetime
import uuid
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    ProfileSettings,
    UserSignUps,
    AnimeCategories,
)
        
class NewTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


class UserCreateSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)    

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError('Passwords must match!')
        return data

    def create(self, validated_data):
        data = {
            key: value for key, value in validated_data.items()
            if key not in ('password1', 'password2')
        }

        data['password'] = make_password(validated_data['password1'])

        return ProfileSettings.objects.create(**data)
    
    class Meta:
        model = ProfileSettings
        fields = (
            'id', 'username', 'email', 'password1', 'password2'
        )
        read_only_fields = ('id',)


class UsernameSerializer(serializers.Serializer):
    class Meta:
        model = ProfileSettings
        fields = ('id', 'username',)


class UserUpdatePassword(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)



class SignUpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSignUps
        fields = '__all__'

    def create(self, validated_data):
        validated_data['sign_up_date'] = datetime.now()
        instance = UserSignUps.objects.create(**validated_data)
        return instance
    


class AnimeCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeCategories
        fields = '__all__'

class NewUserSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileSettings
        fields = ['anime_categories', 'anime_genres', 'streaming_services']

    def create(self, validated_data):
        cat_data = validated_data.pop('anime_categories', [])
        genre_data = validated_data.pop('anime_genres', [])
        streaming_data = validated_data.pop('streaming_services', [])
        instance = ProfileSettings.objects.create(**validated_data)

        instance.anime_categories.set(cat_data)
        instance.anime_genres.set(genre_data)
        instance.streaming_services.set(streaming_data)

        return instance    

    def update(self, instance, validated_data):
        anime_categories = validated_data.get('anime_categories')
        anime_genres = validated_data.get('anime_genres')
        streaming_services = validated_data.get('streaming_services')
        
        if anime_categories is not None:
            instance.anime_categories.set(anime_categories)

        if anime_genres is not None:
            instance.anime_genres.set(anime_genres)
    
        if streaming_services is not None:
            instance.streaming_services.set(streaming_services)
