from rest_framework import serializers
from .models import Aesthetician, UserProfile, Service, Appointment, LoyaltyPoints

class AestheticianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aesthetician
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class LoyaltyPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoyaltyPoints
        fields = '__all__'