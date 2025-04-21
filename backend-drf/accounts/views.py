from django.shortcuts import render
from rest_framework import generics
from .models import Account
from .serializers import  UserSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        response = {
            'status':'Request was permitted'
        }
        return Response(response)
