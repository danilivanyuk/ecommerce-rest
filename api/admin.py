from ast import Sub
from django.contrib import admin
from .models import *

admin.site.register(Customer)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Colors)
