# Generated by Django 4.2.15 on 2024-09-13 11:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contact_analytics', '0002_rename_given_name_accountprofile_first_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='accountprofile',
            old_name='first_name',
            new_name='given_name',
        ),
    ]
