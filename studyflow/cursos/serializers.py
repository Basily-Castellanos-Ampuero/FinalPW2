from rest_framework import serializers
from .models import Curso, Tema
from django.utils import timezone

class CursoSerializer(serializers.ModelSerializer):
    frecuencia_estudio = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = [
            'id', 'usuario', 'categoria', 'nombre', 'dificultad',
            'tiempo_limite', 'frecuencia_personalizada', 'frecuencia_estudio', 'creado',
        ]

    def get_frecuencia_estudio(self, obj):
        return obj.calcular_frecuencia()


class TemaSerializer(serializers.ModelSerializer):
    porcentaje = serializers.SerializerMethodField()

    class Meta:
        model = Tema
        fields = ['id', 'curso', 'nombre', 'completado', 'avance', 'porcentaje']
        extra_kwargs = {
            'curso': {'write_only': True}
        }

    def get_porcentaje(self, obj):
        return obj.porcentaje_avance()


class CursoDetalleSerializer(serializers.ModelSerializer):
    temas = TemaSerializer(many=True, read_only=True)
    progreso_total = serializers.SerializerMethodField()
    dias_restantes = serializers.SerializerMethodField()
    frecuencia_estudio = serializers.SerializerMethodField()
    siguiente_revision = serializers.SerializerMethodField()
    revisiones_realizadas = serializers.SerializerMethodField()

    class Meta:
        model = Curso
        fields = [
            'id', 'categoria', 'nombre', 'dificultad', 'tiempo_limite',
            'frecuencia_personalizada', 'frecuencia_estudio', 'creado',
            'temas', 'progreso_total', 'dias_restantes',
            'siguiente_revision', 'revisiones_realizadas'
        ]

    def get_progreso_total(self, obj):
        temas = obj.temas.all()
        if not temas.exists():
            return 0
        total = sum(t.porcentaje_avance() for t in temas)
        return round(total / temas.count(), 2)

    def get_dias_restantes(self, obj):
        if not obj.tiempo_limite:
            return None
        try:
            dias = int(obj.tiempo_limite)
            diferencia = (obj.creado + timezone.timedelta(days=dias)) - timezone.now()
            return max(0, diferencia.days)
        except ValueError:
            return None

    def get_frecuencia_estudio(self, obj):
        return obj.calcular_frecuencia()

    def get_siguiente_revision(self, obj):
        try:
            frecuencia_min = obj.frecuencia_personalizada or {
                'facil': 3 * 24 * 60,
                'media': 24 * 60,
                'dificil': 8 * 60
            }.get(obj.dificultad, 24 * 60)

            proxima = obj.creado + timezone.timedelta(minutes=frecuencia_min)
            return proxima.isoformat()
        except Exception:
            return None

    def get_revisiones_realizadas(self, obj):
        try:
            frecuencia_min = obj.frecuencia_personalizada or {
                'facil': 3 * 24 * 60,
                'media': 24 * 60,
                'dificil': 8 * 60
            }.get(obj.dificultad, 24 * 60)

            minutos_totales = (timezone.now() - obj.creado).total_seconds() / 60
            return int(minutos_totales // frecuencia_min)
        except Exception:
            return 0
