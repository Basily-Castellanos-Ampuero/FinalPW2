# Generated by Django 5.2.4 on 2025-07-23 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0005_tema'),
    ]

    operations = [
        migrations.AlterField(
            model_name='curso',
            name='tiempo_limite',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
