
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
from .image_processing.human_detection import detect_human, toNdarray


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

        try:
            id = request.data['id']
            user_id = request.data['user_id']
            image = request.data['image']
            content = request.data['content']

            image = toNdarray(image)
            isinHuman = detect_human(image)

            if isinHuman:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                user = User.objects.get(user_id=user_id)
                post_db = Post(id=id, user_id=user, image=image, content=content)
                post_db.save()
                return Response([request.data])
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        data = request.data.copy()
        if data['type'] is not None: # typeは外部キーなので，Primary Keyを渡す必要がある
            type_name = data['type']
            type = Type.objects.filter(name=type_name)
            if type.count() > 0 :
                data['type'] = type.first().id
            else: # typeが登録されていなかった場合は登録
                typeob = Type(name=type_name)
                typeob.save()
                data['type'] = typeob.id
            serializer = AnimalSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ユーザ情報取得のView(GET)
class GetAuthInfo(generics.RetrieveAPIView):
    '''
    About: 送られたきたトークンを見てそのユーザーの情報を返す
    Use example:
        headers = {'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]'}
        r = requests.get('http://localhost:8000/api/user/', headers=headers)
        r.json() # {'id': 1, 'mail': 'hoge@gmail.com', 'user_id': 'takumi', 'password': '(暗号化されたパスワード)', 'name': None, 'image': 'media/user_images/(暗号化?されたファイル名).png', 'sex': None, 'type': 'わんこ', 'birthday': '2020-09-20', 'residence': None, 'profile': '', 'created_at': '2020-09-20T07:26:36Z'}
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
            'image': request.user.image.url, # パスを返す
            'sex': request.user.sex,
            'type': request.user.type.name, # nameを返す
            'birthday': request.user.birthday,
            'residence': request.user.residence,
            'profile': request.user.profile,
            'created_at': request.user.created_at,
        },
            status=status.HTTP_200_OK)

class GetUserInfo(APIView):
    permission_classes = (permissions.AllowAny,)
    '''
    About: user_idを指定してユーザー情報を取得する
    Use Example:
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'}} # 'Content-Type'を持たせると通らない？
        data = {'user_id': 'takumi'}
        r = requests.get('http://localhost:8000/api/user/get/', data=data, headers=headers)
        r.json() # {'id': 1, 'mail': 'hoge@gmail.com', 'user_id': 'takumi', 'password': '[暗号化されたパスワード]', 'name': None, 'image': 'media/user_images/(暗号化?されたファイル名).png', 'sex': None, 'type': 'わんこ', 'birthday': '2020-09-20', 'residence': None, 'profile': '', 'created_at': '2020-09-20T07:26:36Z'}
    '''
    def get(self, request):
        try:
            user_id = request.data['user_id']
            user = User.objects.get(user_id=user_id)
            try:
                type_name = user.type.name
            except:
                type_name = None

            try:
                image_url = user.image.url
            except:
                image_url = None
            return Response(data={
                'id': user.id,
                'mail': user.mail,
                'user_id': user.user_id,
                'password': user.password,
                'name': user.name,
                'image': image_url, # パスを返す
                'sex': user.sex,
                'type': type_name, # nameを返す
                'birthday': user.birthday,
                'residence': user.residence,
                'profile': user.profile,
                'created_at': user.created_at,
            },
                status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllPost(APIView):
    permission_classes = (permissions.AllowAny,)
    '''
    Author: Takumi Sato
    Date: 2020/09/18
    About: You can get all post which users posted in animar. This is made for feed screen.
    Use Exmple:
        headers = {'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]'} # Content-TYpeがなくても通る
        r = requests.get('http://localhost:8000/api/getpost/', headers=headers)
        r.json() # [{'id': 1, 'user_id': 'takumm', 'image': 'media/post_images/(暗号化?されたファイル名).png', 'content': 'こんにちは！私は猫です', 'like': 0}, {'id': 2, 'user_id': 'takumi', 'content': 'hello, I am cat', 'like': 0}]
    '''
    def get(self, request):
        try:
            post = Post.objects.all()
            post_resp = [
                {'id': i.id,  # primary_key
                 'user_id': i.user_id.user_id,
                 'image': i.image.url, # パスを返す，例) "post_images/~~.png"
                 'content': i.content,
                 'like': Like.objects.filter(post_id=i.id).count()
                 }
                for i in post
            ]
            return Response(post_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetFilteredPost(APIView):
    permission_classes = (permissions.AllowAny,)
    '''
    Author: Takumi Sato
    Data: 2020/09/18
    About: You can get filtered posts. "Filtered" means that you can select type of animal on posts.
    Use Example:
        data = {'name': '猫'}
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'} # Content-Typeがあると通らない
        r = requests.get('http://localhost:8000/api/getfilteredpost/', data=data, headers=headers)
        r.json() # [{'id': 2, 'user_id': 'takumi', 'image': 'media/post_images/(暗号化?されたファイル名).png', 'content': 'hello, I am cat.', 'like': 0}]
    '''
    def get(self, request):
        try:
            req_type = request.data['name'] # JSONに絞りたいタイプのnameを入れて送ってもらうのが良い？
            post = Post.objects.all()
            # post_resp = [
            #     {'id': i.id,  # primary_key
            #      'user_id': i.user_id.user_id,
            #      'image': i.image.name, # パスを返す，例) "post_images/~~.png"
            #      'content': i.content,
            #      'like': Like.objects.filter(post_id=i.id).count()
            #      }
            #     for i in post if User.objects.get(user_id=i.user_id.user_id).type.name==req_type # 設計書ではidと結び付けてるけどいい？
            # ]
            post_resp = []
            for i in post:
                user = User.objects.get(user_id=i.user_id.user_id)
                if user.type is not None: # typeが入っていないユーザーの投稿があるとエラーが出るため
                    if user.type.name == req_type:
                        post_resp.append(
                            {'id': i.id,  # primary_key
                            'user_id': i.user_id.user_id,
                            'image': i.image.url, # パスを返す，例) "post_images/~~.png"
                            'content': i.content,
                            'like': Like.objects.filter(post_id=i.id).count()
                            })
            return Response(post_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PostLike(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    """
    author : Nakagaki Yuto
    date   : 2020/09/18
    About: You can post like.
    Use Example:
        data = {'post_id': 1, 'user_id': 1}
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'}
        r = requests.post('http://localhost:8000/api/like/', data=data, headers=headers)
        r.json() # [{'post_id': 1, 'user_id': 1}]
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
