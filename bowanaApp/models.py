from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Aesthetician(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
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
