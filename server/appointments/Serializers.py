from rest_framework import serializers
from .models import Appointment, Service

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price']

class AppointmentSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True)

    class Meta:
        model = Appointment
        fields = ['id', 'user', 'services', 'appointment_date', 'total_amount']

    def create(self, validated_data):
        services_data = validated_data.pop('services')
        appointment = Appointment.objects.create(**validated_data)
        for service_data in services_data:
            service = Service.objects.get(id=service_data['id'])
            appointment.services.add(service)
        return appointment
