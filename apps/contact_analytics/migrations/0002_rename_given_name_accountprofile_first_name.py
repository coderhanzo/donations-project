# Generated by Django 4.2.15 on 2024-09-13 11:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact_analytics', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='accountprofile',
            old_name='given_name',
            new_name='first_name',
        ),
    ]
