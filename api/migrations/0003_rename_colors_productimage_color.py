# Generated by Django 4.0.5 on 2022-09-07 15:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_colors2'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productimage',
            old_name='colors',
            new_name='color',
        ),
    ]
