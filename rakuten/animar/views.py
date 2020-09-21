
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
from .serializer import HumanSerializer, AnimalSerializer, LikeSerializer
from .models import User, UserManager, Post, Type, Like
# from image_processing.human_detection import detect_human



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


class PostAPI(APIView):
    """
    author : Takahiro Suzuki
    date   : 2020/09/18
    description :
    process HTTP POST request.
    """

    def post(self, request):
        """
        process POST request.
        overview of this method is following:
        STEP1 : detect human is in posted image or not.
        STEP2 : if human is in image, reject this post request and return error response.
        STEP3 : otherwise, add data to Post Database and return success response.
        """
        id = request.data['id']
        user_id = request.data['user_id']
        image = request.data['image']
        content = request.data['content']

        # TODO: 未実装なので実装をする
        isinHuman = True #detect_human(image)

        if isinHuman:
            # TODO: レスポンスがこんな感じでいいのかを確認する
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            post_db = Post(id=id, user_id=user_id, image=image, content=content)
            post_db.save()
            return Response([request.data])


# ユーザ作成のView(POST)


class AuthRegisterHuman(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = HumanSerializer

    def post(self, request, format=None):
        serializer = HumanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # data={
        #     'mail': request.data['mail'],
        #     'user_id': request.data['user_id'],
        #     'password': request.data['password'],
        #     # 'name': request.data['name'],
        #     # 'image': request.data.image,
        #     # 'sex': request.data.sex,
        #     # 'type': request.data.type,
        #     # 'birthday': request.data.birthday,
        #     # 'residence': request.data.residence,
        #     # 'profile': request.data.profile,
        # }
        # user = User(mail=data['mail'], user_id=data['user_id'], password=data['password'])
        # user.save()
        # return Response(data)


class AuthRegisterAnimal(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = AnimalSerializer

    def post(self, request, format=None):
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ユーザ情報取得のView(GET)
class GetUserInfo(generics.RetrieveAPIView):
    '''
    Use example:
        headers = {'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]'}
        r = requests.get('http://localhost:8000/api/user/', headers=headers)
        r.json() # {'id': 1, 'mail': 'hoge@gmail.com', 'user_id': 'takumi', 'password': '(暗号化されたパスワード)', 'name': None, 'image': 'user_images/~~.png', 'sex': None, 'type': 'わんこ', 'birthday': '2020-09-20', 'residence': None, 'profile': '', 'created_at': '2020-09-20T07:26:36Z'}
    '''
    queryset = User.objects.all()
    serializer_class = AnimalSerializer

    def get(self, request, format=None):
        return Response(data={
            'id': request.user.id,
            'mail': request.user.mail,
            'user_id': request.user.user_id,
            'password': request.user.password,
            'name': request.user.name,
            'image': request.user.image.name, # パスを返す
            'sex': request.user.sex,
            'type': request.user.type.name, # nameを返せばいい？
            'birthday': request.user.birthday,
            'residence': request.user.residence,
            'profile': request.user.profile,
            'created_at': request.user.created_at,
        },
            status=status.HTTP_200_OK)


class GetAllPost(APIView):
    '''
    Author: Takumi Sato
    Date: 2020/09/18
    About: You can get all post which users posted in animar. This is made for feed screen.
    Use Exmple:
        headers = {'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]'} # Content-TYpeがなくても通る
        r = requests.get('http://localhost:8000/api/getpost/', headers=headers)
        r.json() # [{'id': 1, 'user_id': 'takumm', 'image': 'post_images/cutecat.png', 'content': 'こんにちは！私は猫です', 'like': 0}, {'id': 2, 'user_id': 'takumi', 'content': 'hello, I am cat', 'like': 0}]
    '''
    def get(self, request):
        try:
            post = Post.objects.all()
            post_resp = [
                {'id': i.id,  # primary_key
                 'user_id': i.user_id.user_id,
                 'image': i.image.name, # パスを返す，例) "post_images/~~.png"
                 'content': i.content,
                 'like': Like.objects.filter(post_id=i.id).count()
                 }
                for i in post
            ]
            return Response(post_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetFilteredPost(APIView): # typeが入っていないユーザーの投稿があると，エラーが出ます
    '''
    Author: Takumi Sato
    Data: 2020/09/18
    About: You can get filtered posts. "Filtered" means that you can select type of animal on posts.
    Use Example:
        data = {'name': '猫'}
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'} # Content-Typeがあると通らない
        r = requests.get('http://localhost:8000/api/getfilteredpost/', data=data, headers=headers)
        r.json() # [{'id': 2, 'user_id': 'takumi', 'image': 'post_images/cutecat.png', 'content': 'hello, I am cat.', 'like': 0}]
    '''
    def get(self, request):
        try:
            req_type = request.data['name'] # JSONに絞りたいタイプのnameを入れて送ってもらうのが良い？
            post = Post.objects.all()
            post_resp = [
                {'id': i.id,  # primary_key
                 'user_id': i.user_id.user_id,
                 'image': i.image.name, # パスを返す，例) "post_images/~~.png"
                 'content': i.content,
                 'like': Like.objects.filter(post_id=i.id).count()
                 }
                for i in post if User.objects.get(user_id=i.user_id.user_id).type.name==req_type # 設計書ではidと結び付けてるけどいい？
            ]
            return Response(post_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PostLike(generics.CreateAPIView):
    """
    author : Nakagaki Yuto
    date   : 2020/09/18
    About: You can post like.
    Use Example:
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'}
        data = {post_id': '1', 'user_id': '1'}
    """

    permission_classes = (permissions.AllowAny,)
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def post(self, request):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
