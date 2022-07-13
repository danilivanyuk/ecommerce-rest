from cmath import log
from distutils.log import Log
from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    categoryImage = serializers.SerializerMethodField('get_img_url')
    
    class Meta:
        model = Category
        fields = ('id', 'title', 'categoryImage')

    def get_img_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        else:
            return ''

   

class SubCategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField('get_img_url')

    class Meta:
        model = SubCategory
        fields = ('category','id', 'title', 'image')

    def get_img_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return obj.image.url
        else:
            return ''

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