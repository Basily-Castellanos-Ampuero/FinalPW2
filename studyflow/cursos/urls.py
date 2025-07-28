from django.urls import path
from .views import CursoCreateView, MisCursosView, CursoDetalleView, TemaCreateView, TemaUpdateView, CursoEliminarView

urlpatterns = [
    path('crear/', CursoCreateView.as_view()),
    path('mis-cursos/', MisCursosView.as_view()),
    path('detalle/<int:curso_id>/', CursoDetalleView.as_view()),
    path('eliminar/<int:pk>/', CursoEliminarView.as_view(), name='eliminar_curso'),
]

