# Generated by Django 5.1.3 on 2024-11-23 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_remove_plan_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plan',
            name='end_date',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='plan',
            name='start_date',
            field=models.IntegerField(),
        ),
    ]
