from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Usuario

class UsuarioAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'nombre', 'is_staff', 'is_superuser']
    search_fields = ['email', 'nombre']
    fieldsets = (
        (None, {'fields': ('email', 'nombre', 'password')}),
        ('Permisos', {'fields': ('is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nombre', 'password1', 'password2'),
        }),
    )
    filter_horizontal = ('groups', 'user_permissions',)

admin.site.register(Usuario, UsuarioAdmin)
