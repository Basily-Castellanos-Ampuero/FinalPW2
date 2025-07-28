from rest_framework import serializers
from .models import Usuario
from rest_framework import serializers
from .models import Usuario
from django.core.validators import EmailValidator

class UsuarioRegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(
        validators=[EmailValidator(message="Ingrese un correo válido")]
    )

    class Meta:
        model = Usuario
        fields = ['id', 'email', 'nombre', 'password']

    def create(self, validated_data):
        user = Usuario(
            email=validated_data['email'],
            nombre=validated_data['nombre']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UsuarioPerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email']  # Añade más si tienes más campos
