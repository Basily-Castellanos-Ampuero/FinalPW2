from django.urls import path
from .views import RegistroUsuarioView, LoginUsuarioView, PerfilUsuarioView

urlpatterns = [
    path('registro/', RegistroUsuarioView.as_view()),
    path('login/', LoginUsuarioView.as_view()),
    path('perfil/', PerfilUsuarioView.as_view()),  
]
