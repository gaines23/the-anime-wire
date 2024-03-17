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
import boto3
import requests

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
from tmdbv3api import TMDb
from tmdbv3api import Search, Movie, TV, Credit, Collection, Person, Find

from .models import (
    ProfileSettings,
    UserSignUps,
    AnimeCategories,
    StreamingServices,
    AnimeGenres,
)
from .serializers import (
    NewTokenObtainPairSerializer
    , UserCreateSerializer
    , UserUpdatePassword
    , SignUpsSerializer
    , AnimeCategoriesSerializer
    , NewUserSelectSerializer
    , StreamingServicesSerializer
    , GenreSerlializer
)


ssm_client = boto3.client('ssm', region_name='us-west-1')

def get_parameter(parameter_name):
    response = ssm_client.get_parameter(Name=parameter_name, WithDecryption=True)
    return response['Parameter']['Value']

env = environ.Env()
environ.Env.read_env()

class NewTokenObtainPairView(TokenObtainPairView):
    serializer_class = NewTokenObtainPairSerializer

tmdb = TMDb()
tmdb.api_key = get_parameter('/tmdb/key')
TMDB_URL = 'https://api.themoviedb.org/3'
tmdb_key = get_parameter('/tmdb/bearer')

movie = Movie()
tv = TV()
series = Collection()
person = Person()
search = Search()
find = Find()

IMDB_KEY = get_parameter('/imdb/rapidapi')
IMDB_HOST = get_parameter('/imdb/rapidapi/url')
IMDB_URL = "https://imdb8.p.rapidapi.com"

MDBA_KEY = get_parameter('/mdba/key')
MDBA_URL = get_parameter('/mdba/url')
MBDA_HOST = 'movie-database-alternative.p.rapidapi.com'


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
    

class StreamingList(APIView):
    ### GET ###
    def get(self, request, *args, **kwargs):
        services = StreamingServices.objects.all()
        serializer = StreamingServicesSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllGenreList(APIView):
    def get(self, request, *args, **kwargs):
        services = AnimeGenres.objects.all()
        serializer = GenreSerlializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NewUserSelections(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            'anime_categories': request.data['anime_categories'],
            'anime_genres': request.data['anime_genres'],
            'streaming_services': request.data['streaming_services']
        }
        
        serializer = NewUserSelectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


### SEARCH ###

## search movies and tv ##
class SearchAllCategories(APIView):
    def get(self, request, title, *args, **kwargs):
        url = IMDB_URL + '/title/v2/find'
        querystring = {"title": title,
                       "titleType":"movie,tvSeries,tvMiniSeries,tvMovie,tvSpecial,tvShort", 
                       "limit":"20",
                       "sortArg":"moviemeter,asc",
                       "genre":"anime,animation"
                    }

        headers = {
            "X-RapidAPI-Key": IMDB_KEY,
            "X-RapidAPI-Host": IMDB_HOST
        }

        response = requests.get(url, headers=headers, params=querystring)

        try:
            # Parse the response as JSON
            json_response = response.json()
            return Response(json_response, status=status.HTTP_200_OK)
        except ValueError:
            # Handle JSON decoding error
            return Response({"error": "Invalid JSON response"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class MovieInformationAPI(APIView):
    def get(self, request, id, *args, **kwargs):
        find_id = find.find_by_imdb_id(id)
        movieid = find_id.movie_results[0]['id']

        movie_url = TMDB_URL + '/movie/' 

        headers = {
            "accept": "application/json",
            "Authorization": tmdb_key
        }

        details_url = movie_url + str(movieid) + "?append_to_response=videos%2Ctrailers%2Cimages%2Ccasts%2Crelease_dates&language=en-US"
        d_response = requests.get(details_url, headers=headers)
        d_data = d_response.json()

        release_dates = d_data.get('release_dates', {}).get('results', [])
        us_release_dates = [release_date for release_date in release_dates if release_date.get('iso_3166_1') == 'US']

        streaming_url = movie_url + str(movieid) + '/watch/providers'
        s_response = requests.get(streaming_url, headers=headers)
        s_data = s_response.json()
        streaming = s_data.get('results', {})

        img_url = movie_url + str(movieid) + '/images'
        i_response = requests.get(img_url, headers=headers)
        i_data = i_response.json()
        bg_images = i_data.get('backdrops', {})
        p_images = i_data.get('posters', {})

        mdba_header = {
            "X-RapidAPI-Key": MDBA_KEY,
	        "X-RapidAPI-Host": MBDA_HOST
        }
        
        mdba_query = {"r": "json", "i": str(id)}
        mdba_response = requests.get(MDBA_URL, headers=mdba_header, params=mdba_query)
        mdba = mdba_response.json()

        try:
            return Response({
                'details': d_data,
                'streaming': streaming['US'],
                'imdb_id': id,
                'backdrops': bg_images,
                'posters': p_images,
                'rating': us_release_dates[0].get('release_dates', [])[0],
                'ratings': mdba.get('Ratings', {}),
                'year': mdba.get('Year')
            })
        except ValueError:
            # Handle JSON decoding error
            return Response({"error": "Invalid JSON response"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
