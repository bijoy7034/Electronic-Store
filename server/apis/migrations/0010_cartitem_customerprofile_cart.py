# Generated by Django 5.1.1 on 2024-10-23 05:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0009_alter_customerprofile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_items', to='apis.customerprofile')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apis.product')),
            ],
            options={
                'unique_together': {('product', 'customer')},
            },
        ),
        migrations.AddField(
            model_name='customerprofile',
            name='cart',
            field=models.ManyToManyField(blank=True, related_name='customer_cart', through='apis.CartItem', to='apis.product'),
        ),
    ]