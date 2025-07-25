import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  confirmar = '';
  mensaje = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  registrar() {
    if (this.password !== this.confirmar) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    this.api.registrarUsuario({
      nombre: this.nombre,
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        this.auth.login(res.nombre, res.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.mensaje = 'Error al registrar usuario.';
      }
    });
  }
}
