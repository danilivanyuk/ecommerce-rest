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
def getCategoriesSubCategories(request):
    categories = Category.objects.all()
    serializer = CategorySubCategorySerializer(categories, many=True)
    return Response(serializer.data)