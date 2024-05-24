from django.shortcuts import render
from rest_framework import viewsets
from .serializer import BlogsSerializer
from .models import Blogs
# Create your views here.

class BlogsView (viewsets.ModelViewSet):
    serializer_class = BlogsSerializer
    queryset = Blogs.objects.all()