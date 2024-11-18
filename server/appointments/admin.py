from django.contrib import admin

# Register your models here.
#from .models import Appointment
from .models import *

admin.site.register(UserProfile)
admin.site.register(Service)
admin.site.register(Payment)
admin.site.register(Appointment)