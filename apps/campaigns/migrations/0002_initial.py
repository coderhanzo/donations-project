# Generated by Django 4.2.15 on 2024-09-13 16:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0001_initial'),
        ('contact_analytics', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='socialwelfareprogram',
            name='profile',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='contact_analytics.accountprofile'),
        ),
        migrations.AddField(
            model_name='photo',
            name='campaigns',
            field=models.ManyToManyField(blank=True, related_name='photos', to='campaigns.monetarycampaign'),
        ),
        migrations.AddField(
            model_name='monetarycampaign',
            name='causes',
            field=models.ManyToManyField(blank=True, related_name='campaigns', to='campaigns.cause'),
        ),
    ]
