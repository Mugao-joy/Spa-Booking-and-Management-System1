from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'aestheticians', views.AestheticianView, 'aesthetician')
router.register(r'userprofiles', views.UserProfileView, 'userprofile')
router.register(r'services', views.ServiceView, 'service')
router.register(r'appointments', views.AppointmentView, 'appointment')
router.register(r'loyaltypoints', views.LoyaltyPointsView, 'loyaltypoints')

urlpatterns = [
    path('', views.home, name='home'),
    path('myadmin/', admin.site.urls),
    path('api/', include(router.urls)),
]