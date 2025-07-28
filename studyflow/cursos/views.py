from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Curso
from .serializers import CursoSerializer
from .models import Curso
from .serializers import CursoDetalleSerializer
from django.utils import timezone
from .serializers import TemaSerializer
from .models import Tema
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework import status


class CursoCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data.copy()
        data['usuario'] = request.user.id  # Por si el serializer lo necesita
        serializer = CursoSerializer(data=data)
        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response(serializer.data)
        print("Errores del serializer:", serializer.errors)  # <-- AGREGADO
        return Response(serializer.errors, status=400)
    
class MisCursosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cursos = Curso.objects.filter(usuario=request.user).order_by('-creado')
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)

class CursoDetalleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, curso_id):
        try:
            curso = Curso.objects.get(id=curso_id, usuario=request.user)
        except Curso.DoesNotExist:
            return Response({'error': 'Curso no encontrado'}, status=404)

        serializer = CursoDetalleSerializer(curso)
        return Response(serializer.data)
    
class TemaCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, curso_id):
        try:
            curso = Curso.objects.get(id=curso_id, usuario=request.user)
        except Curso.DoesNotExist:
            return Response({'error': 'Curso no encontrado'}, status=404)
        
        data = request.data.copy()
        data['curso'] = curso.id
        serializer = TemaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class TemaUpdateView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Tema.objects.all()
    serializer_class = TemaSerializer

    def get_object(self):
        tema = super().get_object()
        if tema.curso.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para modificar este tema.")
        return tema

    def put(self, request, *args, **kwargs):
        print("Datos recibidos para actualizar tema:", request.data)

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        else:
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

class CursoEliminarView(DestroyAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        curso = super().get_object()
        if curso.usuario != self.request.user:
            raise PermissionDenied("No tienes permiso para eliminar este curso.")
        return curso
