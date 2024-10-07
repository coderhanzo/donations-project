<<<<<<< HEAD
# Generated by Django 4.2.15 on 2024-09-13 16:11
=======
# Generated by Django 4.2.15 on 2024-10-07 10:19
>>>>>>> 1b373edb531ba54d5c80232568ae6c422c783b9f

from django.db import migrations, models
import jsonfield.fields
import sorl.thumbnail.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=10)),
                ('name', models.CharField(max_length=200)),
                ('html', models.TextField(verbose_name='HTML')),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('template_data', jsonfield.fields.JSONField()),
                ('meta_data', jsonfield.fields.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Upload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', sorl.thumbnail.fields.ImageField(upload_to='uploads')),
            ],
        ),
    ]
