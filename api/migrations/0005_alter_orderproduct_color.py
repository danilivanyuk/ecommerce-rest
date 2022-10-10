# Generated by Django 4.0.5 on 2022-09-09 12:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_orderproduct_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderproduct',
            name='color',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.colors'),
        ),
    ]