from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite

from app.models import (
    ProfileSettings
)


class AwUserAdmin(admin.ModelAdmin):
    model = ProfileSettings
    list_display = ['username', 'id', 'date_joined', 'last_modified', ]
    readonly_fields = ['id']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['date_joined']
admin.site.register(ProfileSettings, AwUserAdmin)
