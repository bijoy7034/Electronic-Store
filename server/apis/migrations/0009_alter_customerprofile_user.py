# Generated by Django 5.1.1 on 2024-10-22 09:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0008_alter_vendorprofile_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='customerprofile', to=settings.AUTH_USER_MODEL),
        ),
    ]
