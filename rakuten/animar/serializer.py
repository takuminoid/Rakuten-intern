from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from .models import User, UserManager
import json


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at')

    def create(self, data):
        mail = data['mail']
        user_id = data['user_id']
        password = data['password']
        return User.objects.create_user(mail=mail, user_id=user_id, password=password)
