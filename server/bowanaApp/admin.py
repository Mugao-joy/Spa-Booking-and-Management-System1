from django.contrib import admin

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
#from .models import User
# Register your models here.

# class CustomUserAdmin(UserAdmin):
#    list_display = ('email', 'username', 'phone_number','is_staff','is_admin')
#    search_fields = ('email', 'username','phone_number')

   
#    fieldsets = ()
#    filter_horizontal = ()
#    list_filter = ()

# # Now register the new UserAdmin...
# admin.site.register(User, CustomUserAdmin)




"""from .models import Aesthetician, Appointment, UserProfile,LoyaltyPoints,Service
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

"""