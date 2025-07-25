import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  nombreUsuario = '';

  login(nombre: string, token: string) {
    this.isLoggedIn = true;
    this.nombreUsuario = nombre;
    localStorage.setItem('token', token);
    localStorage.setItem('nombre', nombre);
  }

  logout() {
    this.isLoggedIn = false;
    this.nombreUsuario = '';
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
  }

  cargarEstado() {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombre');
    this.isLoggedIn = !!token;
    this.nombreUsuario = nombre || '';
  }
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }
}
