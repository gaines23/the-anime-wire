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