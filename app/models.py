from django.db import models
from the_anime_wire import settings
from django.contrib.auth.models import User, AbstractUser, PermissionsMixin, AbstractBaseUser
from datetime import date, time, datetime
from dateutil import rrule

from django.contrib.postgres.fields import ArrayField
import uuid
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.template.defaultfilters import slugify
from django.contrib.postgres.fields import ArrayField
from django.db.models.functions import ExtractYear


class BaseModel(models.Model):
    """Base model for the application. Uses UUID for pk."""
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4,
    )

    class Meta:
        abstract = True




class ProfileSettings(BaseModel, AbstractUser):
    """UserProfile model for the application. Uses UUID for pk."""
    last_modified = models.DateTimeField(default=None, null=True, blank=True)
    last_password_update = models.DateTimeField(null=True, blank=True, default=None)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def save(self, *args, **kwargs):
        super().save()

    def get_user_uuid(self):
        id = self.id
        return id
    
    class Meta:
        db_table = 'profile_settings'