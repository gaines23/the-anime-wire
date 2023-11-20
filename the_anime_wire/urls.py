from django.urls import path, include
from django.contrib import admin


## url = www.stsconnect.app
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.api-urls'), name="api"),
]