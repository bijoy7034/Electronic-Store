# Generated by Django 5.1.1 on 2024-10-23 12:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0013_order_status_orderitem_price_alter_order_customer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
    ]