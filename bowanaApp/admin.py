from django.contrib import admin
from .models import Aesthetician, Appointment, UserProfile,LoyaltyPoints,Service
#admin.site.register/@admin.register
# Register your models here.

@admin.register(Aesthetician)
class AestheticianAdmin(admin.ModelAdmin):
    list_display = ('name',)

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'service', 'aesthetician', 'date_time')
admin.site.register(Appointment, AppointmentAdmin)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('username', 'duration', 'price')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')

@admin.register(LoyaltyPoints)
class LoyaltyPointsAdmin(admin.ModelAdmin):
    list_display = ('user', 'points')

