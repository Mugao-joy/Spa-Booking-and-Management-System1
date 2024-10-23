from rest_framework import serializers
#from .models import Aesthetician, UserProfile, Service, Appointment, LoyaltyPoints
#from djoser.serializers import UserCreateSerializer
#from django.contrib.auth import get_user_model
from rest_framework import serializers

#User = get_user_model()

"""class AestheticianSerializer(serializers.ModelSerializer):
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


///class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value): #unique email
        if UserProfile.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def create(self, validated_data):
        user = UserProfile(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user"""
    


# class UserCreateSerializer(UserCreateSerializer):
#     class Meta(UserCreateSerializer.Meta):
#         model = User
#         fields = ("id", "email", "username","phone_number","password")