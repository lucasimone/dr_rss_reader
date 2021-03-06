# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-14 22:46
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250)),
                ('slug', models.SlugField(blank=True, editable=False, null=True)),
                ('tags', models.CharField(blank=True, max_length=250)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Feed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(blank=True, max_length=450)),
                ('url', models.CharField(blank=True, max_length=450)),
                ('title', models.CharField(blank=True, max_length=250, null=True)),
                ('last_update', models.DateField(blank=True, editable=False, null=True)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feeds', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FeedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_fetched', models.DateField(auto_created=True, auto_now_add=True)),
                ('title', models.CharField(blank=True, max_length=350)),
                ('link', models.URLField(blank=True)),
                ('content', models.TextField(blank=True)),
                ('read', models.BooleanField(default=False)),
                ('guid', models.CharField(max_length=255)),
                ('pub_date', models.DateTimeField()),
                ('feed', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Feed')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.AlterUniqueTogether(
            name='feed',
            unique_together=set([('url', 'owner')]),
        ),
    ]
