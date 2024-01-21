from django.urls import path, include

from app.views import (
    UserCreate,
    UserLogout,
    NewTokenObtainPairView,
    UserChangePassword,
    UserAutoChangePassword,
    SignUps,
    AnimeCategoriesList,
    StreamingList,
    AllGenreList,
    NewUserSelections,
    SearchAllCategories,
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
 
    path('new-user/signups/', SignUps.as_view(), name='user_signups'),

    path('anime-categories/', AnimeCategoriesList.as_view(), name='categories'),
    path('anime-genres/', AllGenreList.as_view(), name='genres'),
    path('streaming_services/', StreamingList.as_view(), name='streaming_services'),

    path('new-user/registered/selections/', NewUserSelections.as_view(), name='reg_selections'),

    path('api/search/all/<str:title>/', SearchAllCategories.as_view(), name='search'),
]