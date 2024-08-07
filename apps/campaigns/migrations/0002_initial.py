# Generated by Django 5.0.6 on 2024-08-08 13:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0001_initial'),
        ('contact_analytics', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='communitydevelopment',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='disabilitysupport',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='educationalinstitution',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='emergencyrelief',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='environmentalprotection',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='healthcareinstitution',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='healthcarepatient',
            name='profile',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='patient_profile', to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='causes',
            field=models.ManyToManyField(blank=True, related_name='campaigns', to='campaigns.cause'),
        ),
    ]
