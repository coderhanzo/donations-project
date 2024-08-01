# Generated by Django 5.0 on 2024-06-20 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0013_alter_user_bsystems_user_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="bsystems_user",
        ),
        migrations.AlterField(
            model_name="user",
            name="institution_admin",
            field=models.BooleanField(
                blank=True,
                db_default=models.Value(False),
                null=True,
                verbose_name="Is Institution Admin",
            ),
        ),
    ]
