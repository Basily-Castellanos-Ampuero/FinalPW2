import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  nombreUsuario: string | null = null;

  login(nombre: string, token: string) {
    this.isLoggedIn = true;
    this.nombreUsuario = nombre;
    localStorage.setItem('token', token);
    localStorage.setItem('nombreUsuario', nombre);
  }

  logout() {
    this.isLoggedIn = false;
    this.nombreUsuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
  }

  cargarEstado() {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombreUsuario');
    if (token && nombre) {
      this.isLoggedIn = true;
      this.nombreUsuario = nombre;
    }
  }
}
