from django.contrib.auth.backends import BaseBackend
from .models import Usuario
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

Usuario = get_user_model()

class EmailAuthBackend(ModelBackend):
    def authenticate(self, request=None, username=None, password=None, **kwargs):
        print('⚠️ EmailAuthBackend llamado con:', username, password)  # <--- LÍNEA CLAVE
        email = kwargs.get('email', username)
        try:
            user = Usuario.objects.get(email=email)
            if user.check_password(password):
                print('✅ Contraseña válida')
                return user
            else:
                print('❌ Contraseña inválida')
        except Usuario.DoesNotExist:
            print('❌ Usuario no encontrado')
        return None


    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None
