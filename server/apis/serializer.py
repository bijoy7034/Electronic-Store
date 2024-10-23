from rest_framework import serializers
from .models import User, CustomerProfile, VendorProfile, Product, ProductReviews, CartItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_vendor']
        extra_kwargs = {
            'password': {'write_only': True}  
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            is_vendor=validated_data['is_vendor']
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user
    
class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ['phone_number', 'address']

    def create(self, validated_data):
        user = validated_data.pop('user')
        if CustomerProfile.objects.filter(user=user).exists():
            raise serializers.ValidationError('CustomerProfile for this user already exists.')

        customer_profile = CustomerProfile.objects.create(user=user, **validated_data)
        return customer_profile

class ReviewSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()  # or you can define a nested serializer if needed

    class Meta:
        model = ProductReviews
        fields = ['id', 'rating', 'content', 'customer', 'created_at']
        read_only_fields = ['id', 'customer', 'created_at']
    
    def create(self, validated_data):
        customer = self.context['request'].user.customerprofile
        review = ProductReviews.objects.create(customer=customer, **validated_data)
        return review

class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'vendor', 'image', 'reviews', 'created_at']
        read_only_fields = ['id', 'vendor', 'created_at']
    
    def create(self, validated_data):
        vendor = self.context['request'].user.vendorprofile
        product = Product.objects.create(vendor=vendor, **validated_data)
        return product

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

class VendorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendorProfile 
        fields = ['store_name', 'description', 'phone_number'] 
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        if VendorProfile.objects.filter(user=user).exists():
            raise serializers.ValidationError('Vendor Profile Already Exists')
        vendor_profile = VendorProfile.objects.create(user=user, **validated_data)
        return vendor_profile
    
    def update(self, instance, validated_data):
        instance.store_name = validated_data.get('store_name', instance.store_name)
        instance.description = validated_data.get('description', instance.description)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()
        return instance

