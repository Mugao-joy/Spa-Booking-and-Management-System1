from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import AppointmentViewSet

router = routers.DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('admin/',admin.site.urls),
    path('api/', include(router.urls))
]