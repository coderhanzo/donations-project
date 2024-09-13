# Generated by Django 4.2.15 on 2024-09-13 16:11

import apps.campaigns.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnimalCare',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('health_status', models.TextField(blank=True, null=True)),
                ('location', models.TextField(blank=True, null=True)),
                ('special_needs', models.TextField(blank=True, null=True)),
                ('others', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Cause',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=250, null=True, unique=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CommunityDevelopment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('community', models.CharField(blank=True, choices=[('RURAL', 'Rural'), ('URBAN', 'Urban'), ('INDIGENOUS', 'Indigenous')], max_length=255, null=True)),
                ('community_name', models.CharField(max_length=255)),
                ('location', models.TextField(blank=True, null=True)),
                ('key_objectives', models.TextField(blank=True, null=True)),
                ('impact_metrics', models.TextField(blank=True, null=True)),
                ('funding_sources', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='DisabilitySupport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('support_type', models.CharField(choices=[('FINANCIAL AID', 'Financial Aid'), ('EQUIPMENT', 'Equipment'), ('TRAINING', 'Training')], max_length=50)),
                ('organization_name', models.CharField(max_length=255)),
                ('number_of_beneficiaries', models.IntegerField(default=0)),
                ('key_services_provided', models.TextField(blank=True, null=True)),
                ('funding_sources', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EducationalInstitution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institution_type', models.CharField(choices=[('PRIMARY', 'Primary'), ('SECONDARY', 'Secondary'), ('UNIVERSITY', 'University'), ('ORPHANAGE', 'Orphanage')], max_length=50)),
                ('number_of_students', models.IntegerField(default=0)),
                ('programs_offered', models.TextField(blank=True, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('state', models.TextField(blank=True, null=True)),
                ('city', models.TextField(blank=True, null=True)),
                ('accreditation_details', models.TextField(blank=True, null=True)),
                ('educational_needs', models.CharField(blank=True, choices=[('BOOKS', 'Books'), ('SCHOLARSHIP', 'Scholarship'), ('INFRASTRUCTURE', 'Infrastructure')], max_length=50, null=True)),
                ('other_info', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EmergencyRelief',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relief_type', models.CharField(choices=[('NATURAL DISASTER', 'Natural Disaster'), ('CONFLICT', 'Conflict'), ('PANDEMIC', 'Pandemic')], max_length=50)),
                ('area_covered', models.TextField(blank=True, null=True)),
                ('contact_organization', models.TextField(blank=True, null=True)),
                ('number_of_beneficiaries', models.IntegerField(default=0)),
                ('key_services_provided', models.TextField(blank=True, null=True)),
                ('relief_timeline', models.TextField(blank=True, null=True)),
                ('other_info', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EnvironmentalProtection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organization_name', models.CharField(max_length=255)),
                ('project_name', models.CharField(max_length=255)),
                ('location', models.TextField(blank=True, null=True)),
                ('conservation_type', models.CharField(choices=[('REFORESTATION', 'Reforestation'), ('WEILDLIFE PROTECTION', 'Wildlife Protection'), ('CLEAN WATERS', 'Clean Waters')], max_length=50)),
                ('environmental_goals', models.CharField(blank=True, choices=[('PLANTING TREES', 'Planting Trees'), ('REDUCING POLLUTION', 'Reducing Pollution')], max_length=50, null=True)),
                ('impact_metrics', models.TextField(blank=True, null=True)),
                ('funding_sources', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='HealthcareInstitution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institution_type', models.CharField(choices=[('HOSPITAL EQUIPMNET', 'Hospital Equipment'), ('PATIENT CARE', 'Patient Care'), ('HEALTH CENTER', 'Health Center'), ('SENIOR HOMES', 'Senior Homes'), ('MEDICAL SUPPLIES', 'Medical Supplies')], max_length=50)),
                ('health_condition', models.CharField(blank=True, choices=[('CANCER', 'Cancer'), ('DIABETES', 'Diabetes'), ('GENERAL_HEALTH_SUPPORT', 'General Health Support')], max_length=50, null=True)),
                ('number_of_beds', models.IntegerField(default=0)),
                ('number_of_patients_benefiting', models.IntegerField(default=0)),
                ('specializations', models.TextField(blank=True, null=True)),
                ('operating_hours', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='HealthcarePatient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hospital', models.CharField(blank=True, max_length=255, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('illness', models.CharField(blank=True, max_length=255, null=True)),
                ('number_of_patients_benefiting', models.IntegerField(blank=True, default=0, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MonetaryCampaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('progress', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('goal', models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True)),
                ('description', models.TextField(blank=True, max_length=250, null=True)),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=False)),
                ('last_edited', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=apps.campaigns.models.user_directory_path)),
                ('hash_key', models.CharField(blank=True, max_length=64, null=True)),
                ('institution', models.UUIDField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SocialWelfareProgram',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('program_name', models.CharField(max_length=255)),
                ('program_type', models.CharField(choices=[('FOOD AID', 'Food Aid'), ('SHELTER', 'Shelter'), ('EDUCATION', 'Education')], max_length=50)),
                ('target_population', models.TextField(blank=True, null=True)),
                ('funding_sources', models.TextField(blank=True, null=True)),
                ('key_activities', models.TextField(blank=True, null=True)),
                ('impact_metrics', models.TextField(blank=True, null=True)),
                ('campaigns', models.ManyToManyField(blank=True, related_name='SOCIAL_WELFARE_PROGRAM', to='campaigns.monetarycampaign')),
            ],
        ),
    ]
