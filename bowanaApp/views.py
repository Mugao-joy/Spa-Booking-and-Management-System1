from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .Serializers import UserSerializer

from rest_framework import viewsets
from .Serializers import AestheticianSerializer, UserProfileSerializer, ServiceSerializer, AppointmentSerializer, LoyaltyPointsSerializer
from .models import Aesthetician, UserProfile, Service, Appointment, LoyaltyPoints

from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate

def home(request):
    return HttpResponse("Welcome to the Booking Management System!")


class AestheticianView(viewsets.ModelViewSet):
    serializer_class = AestheticianSerializer
    queryset = Aesthetician.objects.all()

@api_view(['POST'])
def CreateUserProfile(request):
    print ('data from frontend:',request.data)
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(request.data['password'])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        # Retrieve or create the token for the authenticated user
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    

class ServiceView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()

class AppointmentView(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

class LoyaltyPointsView(viewsets.ModelViewSet):
    serializer_class = LoyaltyPointsSerializer
    queryset = LoyaltyPoints.objects.all()
