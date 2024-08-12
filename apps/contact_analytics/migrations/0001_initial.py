# Generated by Django 5.0.6 on 2024-08-12 15:39

import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccountProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250)),
                ('given_name', models.CharField(blank=True, max_length=100, null=True)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('beneficiary_type', models.CharField(blank=True, choices=[('EDUCATIONAL_INSTITUTION', 'Educational Institution'), ('HEALTHCARE_INSTITUTION', 'Healthcare Institution'), ('HEALTHCARE_PATIENT', 'Healthcare Patient'), ('ANIMAL', 'Animal'), ('SOCIAL_WELFARE_PROGRAM', 'Social Welfare Program'), ('EMERGENCY_RELIEF', 'Emergency Relief'), ('ENVIRONMENTAL_PROTECTION', 'Environmental Protection/Conservation'), ('COMMUNITY_DEVELOPMENT', 'Community Development'), ('DISABILITY_SUPPORT', 'Disability Support')], max_length=250, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('region', models.CharField(blank=True, max_length=100, null=True)),
                ('profile_photo', models.FileField(blank=True, null=True, upload_to='')),
                ('is_active', models.BooleanField(default=True)),
                ('website', models.URLField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name of Company')),
                ('address', models.CharField(blank=True, max_length=100, null=True, verbose_name='Company Address')),
                ('district', models.CharField(blank=True, max_length=100, null=True, verbose_name='Company District')),
                ('region', models.CharField(blank=True, max_length=100, null=True, verbose_name='Company Region')),
            ],
        ),
        migrations.CreateModel(
            name='PhoneNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None)),
                ('primary_contact', models.BooleanField(default=False)),
                ('notes', models.TextField(blank=True)),
                ('relation', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
