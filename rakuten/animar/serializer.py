from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from .models import User, UserManager


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at')

    def create(self, validated_data):
        return User.objects.create_user(request_data=validated_data)
