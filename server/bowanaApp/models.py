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