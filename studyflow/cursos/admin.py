from django.contrib import admin
from .models import Curso, Tema

class TemaInline(admin.TabularInline):
    model = Tema
    extra = 1  # permite añadir uno nuevo por defecto
    fields = ('nombre', 'avance', 'completado')
    readonly_fields = ('creado',)

# Admin para cursos
@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'usuario', 'categoria', 'dificultad', 'get_frecuencia', 'creado')
    list_filter = ('categoria', 'dificultad', 'creado')
    search_fields = ('nombre', 'usuario__email')
    inlines = [TemaInline]

    def get_frecuencia(self, obj):
        return obj.calcular_frecuencia()
    get_frecuencia.short_description = 'Frecuencia de estudio'

# Admin para temas (opcional, por si quieres gestionarlos también desde su vista)
@admin.register(Tema)
class TemaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'curso', 'avance', 'completado', 'creado')
    list_filter = ('avance', 'completado', 'curso')
    search_fields = ('nombre', 'curso__nombre')
