from django.db import models

from django.db.models import Sum
from django.contrib.auth.models import User
from multiselectfield import MultiSelectField
import datetime
from datetime import timedelta
from django.utils import timezone

from io import BytesIO
from PIL import Image
from django.core.files import File


class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def customers_count(self):
        total = len(self.user)
        return total



CLOTH_SIZE = [
    ("XS", 'XS'),
    ("S", 'S'),
    ("M", 'M'),
    ("L", 'L'),
    ("XL", 'XL'),
    ("XXL", 'XXL'),
]


GENDER_CHOICES = (
    ('man', 'man'),
    ('women', 'women'),
    ('kid', 'kid'),
)


SEASON_CHOICES = (
    ('summer', 'Summer'),
    ('autumn ', 'Autumn'),
    ('winter ', 'Winter'),
    ('spring  ', 'Spring'),
)


class Category(models.Model):
    name = models.CharField(
        max_length=100, verbose_name="Category Title", db_index=True)
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Created: ")
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Updated: ")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-name']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class SubCategory(models.Model):
    category = models.ForeignKey(
        Category, related_name='subcategories', on_delete=models.CASCADE, verbose_name="Category", default=None)
    title = models.CharField(
        max_length=100, verbose_name="SubCategory Title: ")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-name']
        verbose_name = "Subcategory"
        verbose_name_plural = "Subcategories"


def compress(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    im.save(im_io, 'JPEG', optimize=True, quality=70)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image




class Product(models.Model):
    title = models.CharField(max_length=60, verbose_name='Title')
    class Meta:
        ordering = ['-title']
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title

























