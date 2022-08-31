from cmath import log
from distutils.log import Log
from re import search
from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


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
    subcategorySlug = serializers.SerializerMethodField('getSubCategorySlug')

    class Meta:
        model = Product
        # fields = ('subcategory','title', 'image', 'imageAlt', 'sizes', 'inStock', 'gender', 'description', 'sell_price', 'slug')
        fields = '__all__'

    def getSubCategorySlug(self, obj):
        subcategory = SubCategory.objects.filter(
            title=obj.subcategory).values('slug')
        subcategorySlug = ''
        for element in subcategory:
            key, value = list(element.items())[0]

            subcategorySlug = value

        return subcategorySlug

    def getProductImages(self, obj):
        images = ProductImage.objects.filter(
            product=obj).values('image', 'imageAlt')
        return images


class CategorySubCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField('getSubCategories')
    categoryImage = serializers.SerializerMethodField('get_img_url')

    class Meta:
        model = Category
        fields = ('id', 'title', 'subcategories', 'categoryImage')

    def get_img_url(self, category):
        print(category.image)
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


class OrderSerializer(serializers.ModelSerializer):
    orderProducts = serializers.SerializerMethodField('getOrderProducts')

    class Meta:
        model = Order
        fields = ('customer', 'ordered_date', 'orderProducts',
                  'complete', 'transaction_id')

    def getOrderProducts(self, obj):
        print(self)
        orderProducts = OrderProduct.objects.filter(order=obj).values(
            'product', 'quantity', 'size')
        print(orderProducts)

        return orderProducts
