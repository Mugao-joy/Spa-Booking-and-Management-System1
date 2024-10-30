from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Service(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    services = models.ManyToManyField(Service)
    appointment_date = models.DateTimeField(default=timezone.now)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    

    def save(self, *args, **kwargs):
        # Calculate total amount spent by summing up the price of all services
        if not self.total_amount:
            self.total_amount = sum(service.price for service in self.services.all())
        super(Appointment, self).save(*args, **kwargs)

    def __str__(self):
        return f"Appointment for {self.user.username} on {self.appointment_date}"
