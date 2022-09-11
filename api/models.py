from email.mime import image
from pyexpat import model
from random import choices
from unicodedata import category
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

from django.utils.translation import gettext_lazy as _
from numpy import product


class Customer(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    city = models.CharField(max_length=200, null=True)
    street = models.CharField(max_length=200, null=True)
    house = models.CharField(max_length=200, null=True)
    appartament = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name

    def customers_count(self):
        total = len(self.user)
        return total


COLOR_CHOICES = [
    ("White", 'White'),
    ("Gray", 'Gray'),
    ("Black", 'Black'),

]
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
    ('unisex', 'unisex'),
    ('kid', 'kid'),
)


SEASON_CHOICES = (
    ('summer', 'Summer'),
    ('autumn', 'Autumn'),
    ('winter', 'Winter'),
    ('spring', 'Spring'),
)


def compress(image):
    im = Image.open(image)
    # create a BytesIO object
    im_io = BytesIO()
    # save image to BytesIO object
    im.save(im_io, 'JPEG', optimize=True, quality=70)
    # create a django-friendly Files object
    new_image = File(im_io, name=image.name)
    return new_image


class Category(models.Model):
    title = models.CharField(
        max_length=100, verbose_name="Category Title", db_index=True)
    slug = models.SlugField(
        max_length=150,
        null=False,
        unique=False,
        blank=False,
        verbose_name=_("category safe URL"),
        help_text=_(
            "format: required, letters, numbers, underscore, or hyphens"),
    )
    image = models.ImageField(blank=True, null=True,
                              upload_to='categories_images/')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name="Created: ")
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name="Updated: ")

    def __str__(self):
        return self.title

    def getSubCategories(self):
        subcategories = SubCategory.objects.filter(category=self)
        return subcategories

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         new_image = compress(self.image)
    #         # set self.image to new_image
    #         self.image = new_image

    class Meta:
        ordering = ['-title']
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class SubCategory(models.Model):
    category = models.ForeignKey(
        Category, related_name='subcategories', on_delete=models.CASCADE, verbose_name="Category", default=None)
    slug = models.SlugField(
        max_length=150,
        null=False,
        unique=False,
        blank=False,
        verbose_name=_("subcategory safe URL"),
        help_text=_(
            "format: required, letters, numbers, underscore, or hyphens")
    )
    title = models.CharField(
        max_length=100, verbose_name="SubCategory Title: ")
    image = models.ImageField(blank=True, null=True,
                              upload_to='subcategories_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         new_image = compress(self.image)
    #         # set self.image to new_image
    #         self.image = new_image

    class Meta:
        ordering = ['-title']
        verbose_name = "Subcategory"
        verbose_name_plural = "Subcategories"


class Product(models.Model):
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    title = models.CharField(max_length=255,
                             unique=False,
                             null=False,
                             blank=False,
                             verbose_name=_("product name"),
                             help_text=_("format: required, max-255"),)
    # image = models.ImageField(blank=True, null=True, upload_to='products_images/')
    # imageAlt = models.CharField(blank=True, max_length=60)
    sizes = MultiSelectField(null=True, choices=CLOTH_SIZE, max_length=20)
    inStock = models.BooleanField(default=True,
                                  verbose_name=_("product visibility"),
                                  help_text=_("format: true=product visible"),)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=20)
    description = models.TextField(
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product description"),
        help_text=_("format: required"),
    )

    sell_price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("Price"),
        help_text=_("format: maximum price 9999.99"),
        error_messages={
            "name": {
                "max_length": _("the price must be between 0 and 9999.99."),
            },
        },
    )

    slug = models.SlugField(
        max_length=255,
        unique=False,
        null=False,
        blank=False,
        verbose_name=_("product safe URL"),
        help_text=_(
            "format: required, letters, numbers, underscores or hyphens"),
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
        verbose_name=_("date product created"),
        help_text=_("format: Y-m-d H:M:S"),
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("date product last updated"),
        help_text=_("format: Y-m-d H:M:S"),
    )

    class Meta:
        ordering = ['-title']
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return self.title

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         new_image = compress(self.image)
    #         # set self.image to new_image
    #         self.image = new_image
    #     # self.slug = self.title
    #     return super().save(*args, **kwargs)


class Colors(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True,
                              upload_to='products_images/')
    imageAlt = models.CharField(blank=True, max_length=60)
    color = models.ForeignKey(
        Colors, on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return str(self.product)

    def save(self, *args, **kwargs):
        if self.image:
            new_image = compress(self.image)
            # set self.image to new_image
            self.image = new_image
        return super().save(*args, **kwargs)


class Order(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.SET_NULL, blank=True, null=True)
    ordered_date = models.DateTimeField(
        auto_now_add=True)
    complete = models.BooleanField(default=False)
    delivered_date = models.DateTimeField(
        auto_now_add=False, blank=True, null=True)
    transaction_id = models.CharField(max_length=200, null=True)

    # transaction_id = datetime.now().timestamp()
    def __str__(self):
        return str(self.customer)

    class Meta:
        ordering = ['-ordered_date']


class OrderProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    color = models.ForeignKey(
        Colors, on_delete=models.PROTECT)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    size = models.CharField(choices=CLOTH_SIZE, blank=True,
                            null=True, verbose_name='Размеры', max_length=50)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.order)

    class Meta:
        ordering = ['-product']
