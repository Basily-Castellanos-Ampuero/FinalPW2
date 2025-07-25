from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from .models import Usuario
from .serializers import UsuarioRegistroSerializer
from rest_framework.permissions import AllowAny 

class RegistroUsuarioView(generics.CreateAPIView):
    serializer_class = UsuarioRegistroSerializer
    permission_classes = [AllowAny]

class LoginUsuarioView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print('Intentando login con:', email, password)
        user = authenticate(request, username=email, password=password)


        if user is not None:
            print('Usuario autenticado:', user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'nombre': user.nombre
            })
        else:
            print('Autenticación fallida')
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework.permissions import IsAuthenticated
from .serializers import UsuarioPerfilSerializer

class PerfilUsuarioView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioPerfilSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UsuarioPerfilSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
