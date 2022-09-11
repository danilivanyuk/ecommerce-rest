from django.urls import path, re_path
from . import views

urlpatterns = [
    path('getProfile/', views.getProfile, name='getProfile'),
    path('getCustomerOrders/', views.getCustomerOrders, name='getCustomerOrders'),
    path('getCart/', views.getCart, name='getCart'),
    path('getCategories/', views.getCategories, name="getCategories"),
    path('getSubCategories/', views.getSubCategories, name="getSubCategories"),
    path('getProducts/', views.getProducts, name="getProducts"),
    path('getProductsBySubCategory/<str:slug>',
         views.getProductsBySubCategory, name="getProductsBySubcategory"),
]
