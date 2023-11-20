from django.urls import path, include

from app.views import (
    UserCreate,
    UserLogout,
    NewTokenObtainPairView,
    UserChangePassword,
    UserAutoChangePassword,
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    ### Admin URLS ###
    path('register/', UserCreate.as_view()),
    path('login/', NewTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', UserLogout.as_view(), name="logout"),
    path('update-password/', UserChangePassword.as_view(), name='password'),
    path('auto-update-password/', UserAutoChangePassword.as_view(), name='auto_password'),
 
]