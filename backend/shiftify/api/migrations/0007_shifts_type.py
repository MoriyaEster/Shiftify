# Generated by Django 5.0.1 on 2024-02-10 19:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_actualshift_type_remove_shifts_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='shifts',
            name='type',
            field=models.TextField(blank=True, null=True),
        ),
    ]
