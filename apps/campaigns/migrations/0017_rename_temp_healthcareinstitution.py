# Generated by Django 5.0 on 2024-06-18 08:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0016_rename_healthcareinstitution_temp"),
        ("contact_analytics", "0017_accountprofile_website_phonenumber_name_and_more"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="temp",
            new_name="HealthcareInstitution",
        ),
    ]
