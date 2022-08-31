from os import error
from django.core import files
from django.http import response
from django.http.response import HttpResponse


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated, AllowAny


from .serializers import *
from .models import *


@api_view(['GET'])
def getProfile(request):
    profile = Customer.objects.get(id=request.user.id)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(
        categories, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getSubCategories(request):
    subCategories = SubCategory.objects.all()
    serializer = SubCategorySerializer(
        subCategories, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(
        products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getProductsBySubCategory(request, slug):
    products = Product.objects.filter(subcategory__slug=slug)
    serializer = ProductSerializer(
        products, many=True, context={'request': request})
    return Response(serializer.data)
