"""
Definition of views.
"""
import json
from .forms import *
import environ
import logging
from datetime import date
import datetime
from django.core.paginator import Paginator
from itertools import groupby
from collections import defaultdict

from rest_framework.views import APIView
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
import uuid
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.forms.models import model_to_dict
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

from .models import (
    ProfileSettings,
    UserSignUps,
    AnimeCategories
)
from .serializers import (
    NewTokenObtainPairSerializer
    , UserCreateSerializer
    , UserUpdatePassword
    , SignUpsSerializer
    , AnimeCategoriesSerializer
    , NewUserSelectSerializer
)


env = environ.Env()
environ.Env.read_env()

class NewTokenObtainPairView(TokenObtainPairView):
    serializer_class = NewTokenObtainPairSerializer



class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            if self.request.data.get('all'):
                token: OutstandingToken
                for token in OutstandingToken.objects.filter(user=self.request.user.id):
                    _, _ = BlacklistedToken.objects.get_or_create(token=token)
                return Response(status=status.HTTP_205_RESET_CONTENT)
            refresh_token = self.request.data.get('refresh_token')
            token = RefreshToken(token=refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserAutoChangePassword(APIView):
    permission_classes = [IsAuthenticated]

    def get(self):
        user = self.request.user
        return user

    def put(self, request, *args, **kwargs):
        serializer = UserUpdatePassword(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data.get('old_password')
            new_password = serializer.validated_data.get('new_password')
            user = request.user
            if old_password and not user.check_password(old_password):
                return Response({'old_password': ['Wrong password.']}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.last_password_update = timezone.now()
            user.save()
            return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePassword(APIView):
    def get(self):
        user = self.request.user
        return user

    def put(self, request, *args, **kwargs):
        serializer = UserUpdatePassword(data=request.data)
        if serializer.is_valid():
            user = request.user  # Access the user through request.user
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            if not user.check_password(old_password):
                return Response({'old_password': ['Incorrect password.']}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({'detail': 'Password updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class SignUps(APIView):
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        serializer = SignUpsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AnimeCategoriesList(APIView):
    def get(self, request, *args, **kwargs):
        cats = AnimeCategories.objects.all()
        serializer = AnimeCategoriesSerializer(cats, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    
# class NewUserSelections(APIView):
#     def post(self, request, *args, **kwargs):
#         user = request.user.id
        
