import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  email = '';
  nombre = '';
  password = '';
  mensaje = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  registrar() {
    this.api.registrarUsuario({
      email: this.email,
      nombre: this.nombre,
      password: this.password
    }).subscribe({
      next: res => {
        console.log('Registro OK', res);
        this.mensaje = ' Usuario registrado correctamente';
      },
      error: err => {
        console.error(err);
        this.mensaje = ' Error al registrar usuario';
      }
    });
  }

  login() {
    this.api.loginUsuario({
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        console.log('Login OK', res);
        this.auth.login(this.nombre, res.token);
        this.mensaje = ' Login correcto';
      },
      error: err => {
        console.error(err);
        this.mensaje = ' Credenciales incorrectas';
      }
    });
  }
}
