from django.db import models
from django.conf import settings

class Curso(models.Model):
    CATEGORIAS = [
        ('matematicas', 'Matemáticas'),
        ('tecnologia', 'Tecnología'),
        ('programacion', 'Programación'),
        ('ciencias', 'Ciencias'),
        ('letras', 'Letras'),
        ('relacionesHumanas', 'Relaciones Humanas'),
        ('empresas', 'Empresas'),
        ('humanidades', 'Humanidades'), 
    ]

    DIFICULTADES = [
        ('facil', 'Fácil'),
        ('media', 'Media'),
        ('dificil', 'Difícil'),
    ]

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cursos')
    categoria = models.CharField(max_length=50, choices=CATEGORIAS)
    nombre = models.CharField(max_length=200)
    dificultad = models.CharField(max_length=10, choices=DIFICULTADES)
    creado = models.DateTimeField(auto_now_add=True)
    tiempo_limite = models.PositiveIntegerField(blank=True, null=True)  # en días

    frecuencia_personalizada = models.PositiveIntegerField(null=True, blank=True)  # en minutos

    def calcular_frecuencia(self):
        if self.frecuencia_personalizada:
            horas = self.frecuencia_personalizada // 60
            minutos = self.frecuencia_personalizada % 60
            partes = []
            if horas:
                partes.append(f"{horas}h")
            if minutos:
                partes.append(f"{minutos}min")
            return f"Cada {' '.join(partes)}"
        
        if self.dificultad == 'facil':
            return 'Cada 3 días'
        elif self.dificultad == 'media':
            return 'Cada 24 horas'
        elif self.dificultad == 'dificil':
            return 'Cada 8 horas'
        return 'Sin definir'
    
    def __str__(self):
        return f'{self.nombre} ({self.get_dificultad_display()})'
    
class Tema(models.Model):
    AVANCES = [
        ('bajo', 'Bajo (30%)'),
        ('medio', 'Medio (60%)'),
        ('alto', 'Alto (90%)'),
    ]

    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='temas')
    nombre = models.CharField(max_length=200)
    completado = models.BooleanField(default=False)
    avance = models.CharField(max_length=10, choices=AVANCES, default='bajo')
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.nombre} ({self.avance})'

    def porcentaje_avance(self):
        if self.completado:
            return 100
        if self.avance == 'alto':
            return 90
        elif self.avance == 'medio':
            return 60
        elif self.avance == 'bajo':
            return 30
        return 0
