from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import AppointmentListView
from django.urls import path,re_path
from . views import *
from django.urls import path,include 
from django.conf import settings
from django.conf.urls.static import static
from . import views 

#router = routers.DefaultRouter()
#router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    #path('admin/',admin.site.urls),
    #path('api/', include(router.urls)),
    path('auth/token/logout/', LogoutView.as_view(), name='token-logout'),
    path('auth/users/', CustomUserCreateView.as_view(), name='user-create'), 
    path('auth/users/me/profile/', UserProfileView.as_view(), name='user-profile'),
    path('auth/users/me/services/', ServiceListView.as_view(), name='service-list'),
    path('payment/verify/', PaymentVerificationView.as_view(), name='payment-verify'),
    path('auth/users/me/appointments/', AppointmentListView.as_view(), name='appointment-list'),
    path('auth/users/me/appointment/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),

]