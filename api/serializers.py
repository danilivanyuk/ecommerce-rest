from django.db.models import fields
# from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('title',)

   

class SubCategorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SubCategory
        fields = ('id', 'title', 'image')

    def get_img_url(self, obj):
        return self.context["request"].build_absolute_uri(obj.image.url)

class CategorySubCategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField('getSubCategories')
    class Meta:
        model = Category
        fields = ('title', 'subcategories',)

    def getSubCategories(self, obj):
        subcategories = SubCategory.objects.filter(category=obj).values('id', 'title')
        print('AAAAAAAAA', subcategories)
        return subcategories