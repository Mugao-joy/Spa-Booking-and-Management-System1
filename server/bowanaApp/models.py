from django.db import models
from django.utils import timezone
import uuid
from django.db import models
from django.contrib.auth.models import (AbstractBaseUser,PermissionsMixin,BaseUserManager)
#from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.

class Aesthetician(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

"""class UserProfile(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128,null=True)
    subscribed_at = models.DateTimeField(default=timezone.now)

    def set_password(self, raw_password): #hash password
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)

    def __str__(self):
        return self.email

class Service(models.Model):
    username = models.CharField(max_length=100)
    duration = models.IntegerField() # duration of service in mins/hrs???
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE) # ForeignKey to UserProfile model
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    aesthetician = models.ForeignKey(Aesthetician, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    #maybe add boolean for house call and salon visit option

    def __str__(self):
        return f"{self.user.name} - {self.service.name} - {self.date_time}"
    
class LoyaltyPoints(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.name} - {self.points}"

"""




# class UserManager(BaseUserManager):
#     #Method to create a regular user
#     def _create_user(self, email, phone_number, username, password, **extra_fields):
#         # Check if user email and password is provided
#         if not email:
#             raise ValueError("Users must have an email")
#         if not password:
#             raise ValueError("Password must be provided")

#         # Normalize user email
       
#         email = self.normalize_email(email)
#         # Create and save the user
#         user = self.model(email=email, username=username,phone_number=phone_number,  **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
    
#     def create_user(self, **extra_fields):
#         extra_fields.setdefault('is_staff',False)
#         extra_fields.setdefault('is_active',True)
#         extra_fields.setdefault('is_superuser',False)
#         extra_fields.setdefault('is_admin',False)
#         return self._create_user( **extra_fields)
    
#     # Method to create a superuser
#     def create_superuser(self, **extra_fields):
#         extra_fields.setdefault('is_staff',True)
#         extra_fields.setdefault('is_active',True)
#         extra_fields.setdefault('is_admin',True)
#         extra_fields.setdefault('is_superuser',True)
#         return self._create_user( **extra_fields)

# class User(AbstractBaseUser, PermissionsMixin):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     email = models.EmailField(max_length=255, unique=True)
#     username = models.CharField(max_length=255, unique=True)
#     phone_number = PhoneNumberField(unique=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)


#     objects = UserManager()

#     USERNAME_FIELD = "email"
#     REQUIRED_FIELDS = ["username",  "phone_number"]

#     def _str_(self):
#         return self.email
    
#     def get_short_name(self):
#         return self.username
    
#     def has_perm(self, perm, obj=None):
#         return True

#     def has_module_perms(self, app_label):
#         return True