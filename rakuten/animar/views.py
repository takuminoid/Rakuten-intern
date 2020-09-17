
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status, viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User


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
