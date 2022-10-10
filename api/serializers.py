from cmath import log
from distutils.log import Log
from re import search
from wsgiref.handlers import format_date_time
from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    imageURL = serializers.SerializerMethodField('get_img_url')

    class Meta:
        model = Category
        fields = ('id', 'title', 'imageURL', 'slug')

    def get_img_url(self, obj):
        # if obj.image:
        #     request = self.context.get('request')
        #     image_url = obj.image.url
        #     return request.build_absolute_uri(image_url)
        # else:
        #     return ''
        if obj.image:
            return obj.image.url
        else:
            return ''


class SubCategorySerializer(serializers.ModelSerializer):
    imageURL = serializers.SerializerMethodField('get_img_url')
    categorySlug = serializers.SerializerMethodField('getCategorySlug')

    class Meta:
        model = SubCategory
        fields = ('category', 'categorySlug', 'id',
                  'title', 'image', 'imageURL', 'slug')

    def get_img_url(self, obj):
        # if obj.image:
        #     request = self.context.get('request')
        #     image_url = obj.image.url
        #     return request.build_absolute_uri(image_url)
        # else:
        #     return ''
        if obj.image:
            return obj.image.url
        else:
            return ''

    def getCategorySlug(self, obj):
        category = Category.objects.filter(title=obj.category).values('slug')
        categorySlug = ''
        for element in category:
            key, value = list(element.items())[0]
            # categorySlug.join(el.values())
            categorySlug = value
        return categorySlug


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField('getProductImages')
    subcategoryInfo = serializers.SerializerMethodField('getSubCategoryInfo')

    class Meta:
        model = Product
        fields = ('id', 'subcategoryInfo', 'title', 'images',
                  'sizes', 'inStock', 'gender', 'description', 'sell_price', 'slug')
        # fields = '__all__'

    def getSubCategoryInfo(self, obj):
        subcategory = SubCategory.objects.filter(
            title=obj.subcategory).values('title', 'slug')
        return subcategory[0]

    def getProductImages(self, obj):
        images = ProductImage.objects.filter(
            product=obj).values('image', 'imageAlt', 'color__title')
        return images


class CategorySubCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField('getSubCategories')
    categoryImage = serializers.SerializerMethodField('get_img_url')

    class Meta:
        model = Category
        fields = ('id', 'title', 'subcategories', 'categoryImage')

    def get_img_url(self, category):
        if category.image:
            request = self.context.get('request')
            return request.build_absolute_uri(category.image.url)
        else:
            return ''

    def getSubCategories(self, obj):
        subcategories = SubCategory.objects.filter(
            category=obj).values('id', 'title', 'slug')
        # Нужно добавить image_url

        return subcategories


class CartSerializer(serializers.ModelSerializer):
    color_title = serializers.SerializerMethodField('getColorTitle')
    product = serializers.SerializerMethodField('getProduct')

    class Meta:
        model = OrderProduct
        fields = ('id', 'order', 'quantity',
                  'size', 'color_title', 'product',)

    def getColorTitle(self, obj):
        return obj.color.title

    def getProduct(self, obj):
        product = Product.objects.filter(title=obj.product, productimage__color=obj.color).values('id', 'title', 'productimage__image', 'productimage__imageAlt',
                                                                                                  'inStock', 'gender', 'sell_price', 'slug')
        return product


class OrderSerializer(serializers.ModelSerializer):
    orderProducts = serializers.SerializerMethodField('getOrderProducts')
    ordered_date = serializers.SerializerMethodField('myOrderedDateFormat')
    delivered_date = serializers.SerializerMethodField('myDeliveredDateFormat')

    class Meta:
        model = Order
        fields = ('customer', 'ordered_date', 'delivered_date', 'orderProducts',
                  'complete', 'transaction_id')

    def getOrderProducts(self, obj):
        orderProducts = OrderProduct.objects.filter(order=obj).values(
            'product', 'quantity', 'size')

        return orderProducts

    def myOrderedDateFormat(self, obj):
        formatedDate = obj.ordered_date.strftime("%Y-%m-%d %H:%M:%S")
        return formatedDate

    def myDeliveredDateFormat(self, obj):
        if (obj.delivered_date):
            formatedDate = obj.delivered_date.strftime("%Y-%m-%d %H:%M:%S")
        else:
            formatedDate = ''
        return formatedDate


class OrderProductSerializer(serializers.ModelSerializer):
    color_title = serializers.SerializerMethodField('getColorTitle')

    class Meta:
        model = OrderProduct
        fields = ('product', 'order', 'color_title', 'quantity', 'size')

    def getColorTitle(self, obj):
        return obj.color.title
