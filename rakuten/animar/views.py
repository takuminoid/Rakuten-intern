
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from .serializer import UserSerializer
from .models import User, UserManager


class MainAPI(APIView):
    def get(self, request):
        try:
            user = User.objects.all()
            user_resp = [
                {'name': i.name,
                'age': i.age
                }
                for i in user
            ]
            return Response(user_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user = User(name=request.data['name'], age=request.data['age'])
            user.save()
            return Response([request.data])

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ユーザ作成のView(POST)
class AuthRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=sHTTP_500_INTERNAL_SERVER_ERROR)

# ユーザ情報取得のView(GET)
class AuthInfoGetView(generics.RetrieveAPIView):
    '''
    この状態で、ヘッダーに{ 'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]' }を追加した上でGETメソッドを投げると、ログインしているユーザのusername/email/profileを取得することができます。
    '''
    # permission_classes = (permissions.IsAuthenticated,) # ログインしている状態でなければ取得できないようにする
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, format=None):
        return Response(data={
            'id': request.user.id,
            'mail': request.user.mail,
            'user_id': request.user.user_id,
            'password': request.user.password,
            'name': request.user.name,
            'image': request.user.image,
            'sex': request.user.sex,
            'type': request.user.type,
            'birthday': request.user.birthday,
            'residence': request.user.residence,
            'profile': request.user.profile,
            'created_at': request.user.created_at,
            },
            status=status.HTTP_200_OK)
