import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  // Excluir rutas de autenticación
  if (req.url.includes('/login/') || req.url.includes('/registro/')) {
    return next(req); // No modificar
  }

  const token = localStorage.getItem('token');
  console.log('AuthInterceptor ejecutado. Token:', token);

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
