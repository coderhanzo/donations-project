# Generated by Django 4.2.15 on 2024-08-21 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True, verbose_name='Email Address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_login',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='timezone',
            field=models.CharField(blank=True, default='UTC', max_length=50, null=True),
        ),
    ]
