<<<<<<< HEAD
# Generated by Django 4.2.15 on 2024-09-13 09:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid
=======
# Generated by Django 5.0.6 on 2024-09-12 21:05

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models
>>>>>>> 9ec0c839d6911661761166fbd57e26543d4dbfa1


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('schedule', '0014_use_autofields_for_pk'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('boardName', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
<<<<<<< HEAD
=======
            name='AdditionalCalendarInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private', models.BooleanField(default=False)),
                ('calendar', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to='schedule.calendar')),
                ('users', models.ManyToManyField(blank=True, related_name='calendars', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AdditionalEventInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to='schedule.event')),
            ],
        ),
        migrations.CreateModel(
>>>>>>> 9ec0c839d6911661761166fbd57e26543d4dbfa1
            name='Card',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('board', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='scheduler.board')),
            ],
        ),
        migrations.CreateModel(
<<<<<<< HEAD
            name='Task',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('task', models.CharField(max_length=255)),
                ('completed', models.BooleanField(default=False)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='scheduler.card')),
            ],
        ),
        migrations.CreateModel(
=======
>>>>>>> 9ec0c839d6911661761166fbd57e26543d4dbfa1
            name='Tag',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('tagName', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=7)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='scheduler.card')),
            ],
        ),
        migrations.CreateModel(
<<<<<<< HEAD
            name='AdditionalEventInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to='schedule.event')),
            ],
        ),
        migrations.CreateModel(
            name='AdditionalCalendarInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private', models.BooleanField(default=False)),
                ('calendar', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='additional_info', to='schedule.calendar')),
                ('users', models.ManyToManyField(blank=True, related_name='calendars', to=settings.AUTH_USER_MODEL)),
=======
            name='Task',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('task', models.CharField(max_length=255)),
                ('completed', models.BooleanField(default=False)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='scheduler.card')),
>>>>>>> 9ec0c839d6911661761166fbd57e26543d4dbfa1
            ],
        ),
    ]
