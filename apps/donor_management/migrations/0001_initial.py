# Generated by Django 5.0.6 on 2024-09-12 21:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campaigns', '0002_initial'),
        ('contact_analytics', '0001_initial'),
        ('schedule', '0014_use_autofields_for_pk'),
    ]

    operations = [
        migrations.CreateModel(
            name='LeadType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lead_type', models.CharField(choices=[('broad_base_donor', 'Broad Base Donor'), ('mid_range_donor', 'Mid Range Donor'), ('major_donor', 'Major Donor')], default='broad_base_donor', max_length=100, verbose_name='Lead Type')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('currency', models.CharField(default='GHC', max_length=100)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('transaction_type', models.CharField(choices=[('IN', 'Incoming'), ('OUT', 'Outgoing')], max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Donor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount_donated', models.DecimalField(decimal_places=2, default='0.00', max_digits=10)),
                ('notes', models.TextField(blank=True, max_length=500, null=True, verbose_name='Notes')),
                ('attended_events', models.ManyToManyField(blank=True, to='schedule.event')),
                ('donor_profile', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='donor_profile', to='contact_analytics.accountprofile')),
                ('donor_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='donor_management.leadtype')),
            ],
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('campaign', models.ManyToManyField(blank=True, to='campaigns.monetarycampaign')),
                ('patient', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='expenses', to='contact_analytics.accountprofile')),
                ('transaction', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='expense', to='donor_management.transaction')),
            ],
        ),
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('campaign', models.ManyToManyField(blank=True, to='campaigns.monetarycampaign')),
                ('donor', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='donations', to='donor_management.donor')),
                ('transaction', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='donation', to='donor_management.transaction')),
            ],
        ),
    ]
