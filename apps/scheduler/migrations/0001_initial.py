# Generated by Django 5.0.6 on 2024-08-08 13:01

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('schedule', '0014_use_autofields_for_pk'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdditionalEventInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('boardName', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tagName', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=7)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('task', models.CharField(max_length=255)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='AdditionalCalendarInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private', models.BooleanField(default=False)),
                ('calendar', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to='schedule.calendar')),
            ],
        ),
    ]
