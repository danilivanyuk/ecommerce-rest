from django.urls import path, re_path
from . import views

urlpatterns = [
    path('getCategories/', views.getCategories, name="getCategories"),
    path('getSubCategories/', views.getSubCategories, name="getSubCategories"),
    path('getProducts/', views.getProducts, name="getProducts")
]
