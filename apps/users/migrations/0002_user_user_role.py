# Generated by Django 4.2.15 on 2024-08-19 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_role',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
