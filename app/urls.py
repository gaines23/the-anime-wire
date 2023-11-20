from datetime import datetime
from django.urls import path
from app import views
from app.views import *
from app.forms import *


urlpatterns = [
    path('', views.home, name='home'),

]