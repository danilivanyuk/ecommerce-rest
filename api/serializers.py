from cmath import log
from distutils.log import Log
from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    imageURL = serializers.SerializerMethodField('get_img_url')
    
    class Meta:
        model = Category
        fields = ('id', 'title','imageURL')


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

    class Meta:
        model = SubCategory
        fields = ('category','id', 'title', 'image', 'imageURL', 'slug')

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


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = ('subcategory','title', 'image', 'imageAlt', 'sizes', 'inStock', 'gender', 'description', 'sell_price', 'slug')
        fields = '__all__'

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
        subcategories = SubCategory.objects.filter(category=obj).values('id', 'title', 'slug')
        # Нужно добавить image_url
        
        return subcategories