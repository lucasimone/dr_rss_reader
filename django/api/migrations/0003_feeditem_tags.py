# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-22 12:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20170522_0931'),
    ]

    operations = [
        migrations.AddField(
            model_name='feeditem',
            name='tags',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
