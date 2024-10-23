from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_vendor = models.BooleanField(default=False)

class VendorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendorprofile'  )
    store_name = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.store_name

class Product(models.Model):
    name = models.CharField( max_length=250)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    vendor = models.ForeignKey(VendorProfile, on_delete=models.CASCADE,  related_name='vendorprofile')
    created_at= models.DateField(auto_now_add=True)
    image = models.CharField(max_length=255)


class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customerprofile')
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField()
    cart = models.ManyToManyField(Product, through='CartItem', related_name='customer_cart' ,blank=True)

    def __str__(self):
        return self.user.username 


class ProductReviews(models.Model):
    content =  models.TextField()
    rating = models.IntegerField()
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE,  null=True)
    created_at= models.DateField(auto_now_add=True, null=True)

    def __str__(self):
        return self.product

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} of {self.product.name}'

    class Meta:
        unique_together = ('product', 'customer')

