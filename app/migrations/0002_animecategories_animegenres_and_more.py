# Generated by Django 4.2 on 2023-12-30 23:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnimeCategories',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=255)),
                ('description', models.TextField()),
            ],
            options={
                'db_table': 'anime_categories',
            },
        ),
        migrations.CreateModel(
            name='AnimeGenres',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('genre', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'verbose_name_plural': 'Anime Genres',
                'db_table': 'anime_genres',
            },
        ),
        migrations.RemoveField(
            model_name='profilesettings',
            name='last_password_update',
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='auth_level',
            field=models.IntegerField(choices=[(0, 'Admin'), (1, 'User')], default=2),
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='bio',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='prof_pic',
            field=models.ImageField(default='default.png', null=True, upload_to='profile_images'),
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='user_status',
            field=models.IntegerField(choices=[(0, 'Public'), (1, 'Private')], default=0),
        ),
        migrations.AlterField(
            model_name='profilesettings',
            name='last_modified',
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='usersignups',
            name='email',
            field=models.EmailField(max_length=254),
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='anime_categories',
            field=models.ManyToManyField(related_name='user_anime_categories', to='app.animecategories'),
        ),
        migrations.AddField(
            model_name='profilesettings',
            name='anime_genres',
            field=models.ManyToManyField(related_name='user_anime_genres', to='app.animegenres'),
        ),
    ]