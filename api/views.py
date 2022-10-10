from os import error
from webbrowser import get
from django.core import files
from django.http import response
from django.http.response import HttpResponse
from django.http import JsonResponse


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
def getCustomerOrders(request):
    orders = Order.objects.filter(customer=request.user.id, complete=True)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCart(request):
    customer = request.user.customer
    order, created = Order.objects.get_or_create(
        customer=customer, complete=False)
    orderProducts = OrderProduct.objects.filter(order=order)
    serializer = CartSerializer(orderProducts, many=True)
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


# Cart manipulation
@api_view(['POST'])
def addProductToCart(request):
    customer = request.user.customer
    order = Order.objects.get(
        customer=customer, complete=False)
    return JsonResponse('product added to cart')


@api_view(['DELETE'])
def removeProductFromCart(request, pk):

    order = OrderProduct.objects.get(id=pk)
    order.delete()
    return JsonResponse('Item deleted', safe=False)


@api_view(['POST'])
def editOrderProduct(request, pk):
    orderProduct = OrderProduct.objects.get(id=pk)
    serializer = OrderProductSerializer(
        instance=orderProduct, data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer.errors)

    return JsonResponse('quantity edited', safe=False)
