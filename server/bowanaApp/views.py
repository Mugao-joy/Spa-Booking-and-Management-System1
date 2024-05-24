from django.shortcuts import render

from rest_framework import viewsets
from .Serializers import AestheticianSerializer, UserProfileSerializer, ServiceSerializer, AppointmentSerializer, LoyaltyPointsSerializer
from .models import Aesthetician, UserProfile, Service, Appointment, LoyaltyPoints

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Booking Management System!")


class AestheticianView(viewsets.ModelViewSet):
    serializer_class = AestheticianSerializer
    queryset = Aesthetician.objects.all()

class UserProfileView(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()

class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

class LoyaltyPointsView(viewsets.ModelViewSet):
    serializer_class = LoyaltyPointsSerializer
    queryset = LoyaltyPoints.objects.all()
