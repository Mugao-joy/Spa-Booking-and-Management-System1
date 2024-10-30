from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Appointment
from .Serializers import AppointmentSerializer
from rest_framework.permissions import IsAuthenticated

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        appointments = Appointment.objects.all()  # Get all appointments
        return appointments.filter(user=self.request.user)  
        

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
