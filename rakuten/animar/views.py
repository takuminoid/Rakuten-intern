
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
from .serializer import HumanSerializer, AnimalSerializer
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
    この状態で、ヘッダーに{ 'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]' }を追加した上でGETメソッドを投げると、ログインしているユーザのusername/email/profileを取得することができます。
    '''
    # permission_classes = (permissions.IsAuthenticated,) # ログインしている状態でなければ取得できないようにする
    queryset = User.objects.all()
    serializer_class = AnimalSerializer

    def get(self, request, format=None):
        return Response(data={
            'id': request.user.id,
            'mail': request.user.mail,
            'user_id': request.user.user_id,
            'password': request.user.password,
            'name': request.user.name,
            # 'image': request.user.image, # Unicodeエラーが出る
            'sex': request.user.sex,
            'type': request.user.type,
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
        headers = {'Content-Type': 'application/json', 'Authorization': 'JWT [ログイン時に取得したトークン]'}
        r = requests.get('http://localhost:8000/api/getpost/', headers=headers)
        r.json() # [{'id': 1, 'user_id': 'takumm', 'content': 'こんにちは！', 'like': 0}, {'id': 2, 'user_id': 'takumi', 'content': 'me', 'like': 0}]
    '''
    def get(self, request):
        try:
            post = Post.objects.all()
            post_resp = [
                {'id': i.id,  # primary_key
                 'user_id': i.user_id.user_id,
                 # 'image': i.image, # UnicodeDecodeError
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
        headers = {'Authorization': 'JWT [ログイン時に取得したトークン]'}
        r = requests.get('http://localhost:8000/api/getfilteredpost/', data=data, headers=headers)
        r.json() # [{'id': 2, 'user_id': 'takumi', 'content': 'me', 'like': 0}]
    '''
    def get(self, request):
        try:
            req_type = request.data['name'] # JSONに絞りたいタイプのnameを入れて送ってもらうのが良い？
            post = Post.objects.all()
            post_resp = [
                {'id': i.id,  # primary_key
                 'user_id': i.user_id.user_id,
                 # 'image': i.image,
                 'content': i.content,
                 'like': Like.objects.filter(post_id=i.id).count()
                 }
                for i in post if User.objects.get(user_id=i.user_id.user_id).type.name==req_type # 設計書ではidと結び付けてる
            ]
            return Response(post_resp)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PostLike(APIView):
    def post(self, request):
        try:
            like = Like(post_id=request.data['post_id'], user_id=request.data['user_id'])
            like.save()
            return Response([request.data])

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
