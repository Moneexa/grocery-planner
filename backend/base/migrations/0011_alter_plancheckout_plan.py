# Generated by Django 5.1.3 on 2024-11-25 10:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_rename_groceryplan_plancheckout'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plancheckout',
            name='plan',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='plan_checkout', to='base.plan'),
        ),
    ]
