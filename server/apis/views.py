from django.shortcuts import render
from rest_framework import generics , status, viewsets, filters
from django.contrib.auth.models import User
from .serializer import UserSerializer, CustomerProfileSerializer, VendorProfileSerializer, ProductSerializer, ReviewSerializer, CartItemSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomerProfile, VendorProfile, Product, ProductReviews, CartItem


User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            return Response({
                'message':'User Created',
                'user':serializer.data
            }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_active:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': serializer.data,
                'message': 'Login Success'
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid credentials or inactive user'}, status=status.HTTP_400_BAD_REQUEST)



class CustomerProfileView(generics.GenericAPIView):
    queryset = CustomerProfile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerProfileSerializer

    def get_object(self):
        try:
            return self.request.user.customerprofile
        except CustomerProfile.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        profile = self.get_object()
        if profile:
            serializer = self.get_serializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)  
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        profile = self.get_object()
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Profile Not Created', 'created': False})


class AddToCartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.customerprofile
        cart_items = profile.cart_items.all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response({'cart_items': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        

        cart_item, created = CartItem.objects.get_or_create(
            customer=request.user.customerprofile,
            product=product,
            defaults={'quantity': quantity}
        )

    
        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response({'message': 'Added to cart', 'cart_item': CartItemSerializer(cart_item).data}, status=status.HTTP_201_CREATED)
    
    def delete(self, request, cart_item_id):
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, customer=request.user.customerprofile)
            cart_item.delete()
            return Response({'message': 'Cart item removed successfully'}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)





class VendorProfileView(generics.GenericAPIView):
    queryset = VendorProfile.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = VendorProfileSerializer 

    def get_object(self):
        try:
            return self.request.user.vendorprofile  
        except VendorProfile.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        profile = self.get_object()
        if profile:
            serializer = self.get_serializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user) 
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        profile = self.get_object()
        if profile:
            serializer = self.get_serializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Profile Not Created', 'created' : False})


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'vendorprofile'):
            return Product.objects.filter(vendor= self.request.user.vendorprofile)
        return Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user.vendorprofile)


class Review(viewsets.ModelViewSet):
    queryset = ProductReviews.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(customer = self.request.user.customerprofile)
        