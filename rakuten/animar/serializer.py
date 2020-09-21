from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from .models import User, UserManager, Like

class HumanSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at')

    def create(self, data):
        mail = self.data['mail']
        user_id = self.data['user_id']
        password = data['password']
        return User.objects.create_user(mail=mail, user_id=user_id, password=password)

class AnimalSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('mail', 'user_id', 'password', 'name', 'image', 'sex', 'type', 'birthday', 'residence', 'profile', 'created_at')

    def create(self, data):
        mail = self.data['mail']
        user_id = self.data['user_id']
        password = data['password']
        name = self.data['name']
        sex = self.data['sex']
        type = self.data['type']
        image = self.data['image']
        birthday = self.data['birthday']
        residence = self.data['residence']
        profile = self.data['profile']
        return User.objects.create_user(mail=mail, user_id=user_id, password=password, name=name, sex=sex, type=type, birthday=birthday, residence=residence, profile=profile)

class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Like
        fields = ('post_id', 'user_id')

    def create(self, data):
        post_id = self.data['post_id']
        user_id = self.data['user_id']
        return Like.objects.create_like(self, post_id=post_id, user_id=user_id)