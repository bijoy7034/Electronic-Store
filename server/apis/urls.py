from django.urls import path, include
from .views import (
    register, 
    LoginView, 
    CustomerProfileView, 
    VendorProfileView, 
    ProductView, 
    Review, 
    AddToCartView
)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'product', ProductView, basename='product')
router.register(r'review', Review, basename='review')

urlpatterns = [
    # Authentication
    path('register/', register, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),

    # Profile
    path('customer/profile/', CustomerProfileView.as_view(), name='customer_profile'),
    path('customer/cart/', AddToCartView.as_view(), name='cart-items'),
    path('customer/cart/remove/<int:cart_item_id>/', AddToCartView.as_view(), name='remove-cart-item'),  # for removing an item
    path('vendor/profile/', VendorProfileView.as_view(), name='vendor_profile'),

    # Product
    path('viewsets/', include(router.urls)),
]
