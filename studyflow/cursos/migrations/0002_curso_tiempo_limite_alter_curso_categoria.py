# Generated by Django 5.2.4 on 2025-07-22 23:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cursos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curso',
            name='tiempo_limite',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='curso',
            name='categoria',
            field=models.CharField(choices=[('matematicas', 'Matemáticas'), ('tecnologia', 'Tecnología'), ('programacion', 'Programación'), ('ciencias', 'Ciencias'), ('letras', 'Letras'), ('relacionesHumanas', 'Relaciones Humanas'), ('empresas', 'Empresas'), ('humanidades', 'Humanidades')], max_length=50),
        ),
    ]
