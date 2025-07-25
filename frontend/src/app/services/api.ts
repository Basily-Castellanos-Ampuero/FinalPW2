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
  }

  loginUsuario(data: any): Observable<any> {
    return this.http.post(this.BASE_URL + 'login/', data);
  }
}
