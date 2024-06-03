from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets
from .Serializers import AestheticianSerializer, UserProfileSerializer, ServiceSerializer, AppointmentSerializer, LoyaltyPointsSerializer
from .models import Aesthetician, UserProfile, Service, Appointment, LoyaltyPoints

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Booking Management System!")


class AestheticianView(viewsets.ModelViewSet):
    serializer_class = AestheticianSerializer
    queryset = Aesthetician.objects.all()

@api_view(['POST'])
def UserProfile(request):
    print ('data from frontend:',request.data)
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()

class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

class LoyaltyPointsView(viewsets.ModelViewSet):
    serializer_class = LoyaltyPointsSerializer
    queryset = LoyaltyPoints.objects.all()
