# Generated by Django 5.0 on 2024-03-01 16:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("campaigns", "0004_rename_name_patient_profile"),
        (
            "contact_analytics",
            "0004_remove_phonenumber_company_accountprofile_company_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="patient",
            name="profile",
            field=models.OneToOneField(
                default=None,
                on_delete=django.db.models.deletion.CASCADE,
                to="contact_analytics.accountprofile",
            ),
        ),
    ]
