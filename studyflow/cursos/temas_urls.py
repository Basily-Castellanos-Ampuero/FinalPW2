from django.urls import path
from .views import TemaCreateView, TemaUpdateView

urlpatterns = [
    path('crear/<int:curso_id>/', TemaCreateView.as_view()),
    path('tema/<int:pk>/editar/', TemaUpdateView.as_view()),
]