from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from blogs import views

router = routers.DefaultRouter()
router.register(r'blogs', views.BlogsView,'blogs')

urlpatterns = [
    path('admin/',admin.site.urls),
    path('api/', include(router.urls))
]