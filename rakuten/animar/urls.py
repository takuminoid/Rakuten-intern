from django.contrib import admin
from django.urls import path, include
from django.conf.urls import include, url
from rest_framework import routers
from .views import AuthRegister, AuthInfoGetView
from . import views

urlpatterns = [
    path('', views.MainAPI.as_view(), ),
    url(r'^register/$', AuthRegister.as_view()), 
    url(r'user/$', AuthInfoGetView.as_view(), ), 
]
