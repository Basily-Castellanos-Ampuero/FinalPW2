from rest_framework import serializers
from .models import Usuario
from django.core.validators import EmailValidator
from django.core.mail import send_mail
from django.conf import settings
from django.core.mail import EmailMessage


class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        validators=[EmailValidator(message="Ingrese un correo válido")]
    )

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nombre', 'password']

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def create(self, validated_data):
        user = Usuario(
            email=validated_data['email'],
            nombre=validated_data['nombre']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Envío de correo de bienvenida codificado correctamente
        asunto = 'Bienvenido a StudyFlow'
        mensaje = f'Hola {user.nombre}, ¡gracias por registrarte en StudyFlow! 📚'
        correo = EmailMessage(
            subject=asunto,
            body=mensaje,
            from_email=None,
            to=[user.email]
        )
        correo.encoding = 'utf-8'
        correo.send(fail_silently=True)

        return user


class UsuarioPerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email']
