# Generated by Django 4.2.15 on 2024-08-19 11:08

import apps.users.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import phonenumber_field.modelfields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('institution_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Institution Name')),
                ('email', models.EmailField(blank=True, max_length=255, null=True, unique=True, verbose_name='Institution Email')),
                ('phone', models.CharField(blank=True, max_length=255, null=True, verbose_name='Institution Phone')),
                ('contact_person', models.CharField(blank=True, max_length=255, null=True, verbose_name='Contact Person')),
                ('contact_person_phone', models.CharField(blank=True, max_length=200, null=True, verbose_name='Contact Person Phone')),
                ('contact_person_email', models.EmailField(blank=True, max_length=200, null=True, verbose_name='Contact Person email')),
                ('contact_person_position', models.CharField(blank=True, max_length=150, null=True, verbose_name='Contact Person Position')),
                ('institution_certificate', models.FileField(blank=True, null=True, upload_to=apps.users.models.Institution.user_directory_path, verbose_name='Institution Certificate')),
                ('institution_license', models.FileField(blank=True, null=True, upload_to=apps.users.models.Institution.user_directory_path, verbose_name='Institution License')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email Address')),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=30, null=True, region=None, verbose_name='Phone Number')),
                ('timezone', models.CharField(default='UTC', max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('institution', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, related_name='users', to='users.institution')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
    ]
