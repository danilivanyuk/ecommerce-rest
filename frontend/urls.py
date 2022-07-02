from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.frontend, name='homepage'),
    re_path(r'^(?:.*)/?$', views.frontend)
]
