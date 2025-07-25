import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PerfilComponent {
  nombre = '';
  email = '';
  mensaje = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.obtenerPerfil().subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.email = data.email;
      },
      error: (err) => {
        console.error(err);
        this.mensaje = 'Error al cargar el perfil';
      }
    });
  }

  guardar() {
    this.api.actualizarPerfil({ nombre: this.nombre, email: this.email }).subscribe({
      next: (res) => {
        this.mensaje = 'Perfil actualizado correctamente.';
      },
      error: () => {
        this.mensaje = 'Hubo un error al actualizar el perfil.';
      }
    });
  }
}
