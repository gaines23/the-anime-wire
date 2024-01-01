from django.db import models
from the_anime_wire import settings
from django.contrib.auth.models import User, AbstractUser, PermissionsMixin, AbstractBaseUser
from datetime import date, time, datetime
from dateutil import rrule
from PIL import Image

from django.contrib.postgres.fields import ArrayField
import uuid
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.template.defaultfilters import slugify
from django.contrib.postgres.fields import ArrayField
from django.db.models.functions import ExtractYear


class AnimeCategories(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self) -> str:
        return self.category
    
    class Meta:
        db_table = 'anime_categories'


class AnimeGenres(models.Model):
    id = models.IntegerField(primary_key=True)
    genre = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.genre

    class Meta:
        db_table = 'anime_genres'
        verbose_name_plural = 'Anime Genres'


class StreamingServices(models.Model):
    id = models.BigAutoField(primary_key=True)
    streaming_name = models.CharField(max_length=255)
    ranking = models.IntegerField(blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    logo_url = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.streaming_name
    
    class Meta:
        db_table = 'streaming_services'


class BaseModel(models.Model):
    """Base model for the application. Uses UUID for pk."""
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4,
    )

    class Meta:
        abstract = True


class UserSignUps(models.Model):
    """Model to store user signups data."""
    id = models.AutoField(primary_key=True)
    email = models.EmailField(null=False, blank=False)
    sign_up_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_signups'

STATUS = (
    (0,"Open"),
    (1,"Restricted")
)

USER_STATUS = (
    (0, "Public"),
    (1, "Private")
)

AUTH_LEVEL = (
    (0, "Admin"),
    (1, "User")
)

class ProfileSettings(BaseModel, AbstractUser):
    """UserProfile model for the application. Uses UUID for pk."""
    bio = models.CharField(max_length=250, blank=True, null=True)
    #prof_pic = models.ImageField(default='default.png', upload_to='profile_images', null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    user_status = models.IntegerField(choices=USER_STATUS, default=0) # profile public/private -> user choses
    auth_level = models.IntegerField(choices=AUTH_LEVEL, default=2)
    anime_categories = models.ManyToManyField(AnimeCategories, related_name="user_anime_categories")
    anime_genres = models.ManyToManyField(AnimeGenres, related_name="user_anime_genres")
    streaming_services = models.ManyToManyField(StreamingServices, related_name="user_streaming_services")

    def __str__(self):
        return '{}'.format(self.username)

    # def save(self, *args, **kwargs):
    #     super().save()

    #     img = Image.open(self.prof_pic.path)
    
    #     if img.height > 100 or img.width > 100:
    #         new_img = (100, 100)
    #         img.thumbnail(new_img)
    #         img.save(self.prof_pic.path)

    def get_user_id(self):
        id = self.id
        return str(id)

    def get_user_uuid(self):
        id = self.id
        return id
    
    class Meta:
        db_table = 'profile_settings'


