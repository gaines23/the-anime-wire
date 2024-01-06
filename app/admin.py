from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite

from app.models import (
    ProfileSettings,
    AnimeCategories,
    StreamingServices
)


class AwUserAdmin(admin.ModelAdmin):
    model = ProfileSettings
    list_display = ['username', 'id', 'date_joined', 'last_modified', ]
    readonly_fields = ['id']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['date_joined']
admin.site.register(ProfileSettings, AwUserAdmin)

class AnimeCategoriesAdmin(admin.ModelAdmin):
    list_display = ['category', 'id', 'description']
    readonly_fields = ['id']
    model = AnimeCategories
admin.site.register(AnimeCategories, AnimeCategoriesAdmin)

class StreamingListAdmin(admin.ModelAdmin):
    model = StreamingServices
admin.site.register(StreamingServices, StreamingListAdmin)