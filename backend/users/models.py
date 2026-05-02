from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Additional fields if needed
    role_choices = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    )
    role = models.CharField(max_length=10, choices=role_choices, default='customer')
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True, default='India')

    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return f"{self.email} ({self.role})"
