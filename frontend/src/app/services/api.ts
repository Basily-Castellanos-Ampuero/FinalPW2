import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://127.0.0.1:8000/api/usuarios/';
  private http = inject(HttpClient);

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'registro/', data);
    console.log('Enviando login:', data);
  }

  loginUsuario(data: any): Observable<any> {
    console.log('Enviando login:', data);
    return this.http.post(this.BASE_URL + 'login/', data);
    console.log('Enviando login:', data);

  }
  obtenerPerfil(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/usuarios/perfil/');
  }
  actualizarPerfil(data: any): Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/usuarios/perfil/', data);
  }
  crearCurso(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/cursos/crear/', data);
  }
  obtenerCursosDelUsuario(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/cursos/mis-cursos/');
  }
  obtenerCursoDetalle(cursoId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/cursos/detalle/${cursoId}/`);
  }
  
  actualizarTema(temaId: number, data: any): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/temas/tema/${temaId}/editar/`, data);
  }

  crearTema(cursoId: number, data: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/temas/crear/${cursoId}/`, data);
  }

}
