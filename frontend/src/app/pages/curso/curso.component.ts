import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  imports: [CommonModule, FormsModule],
})
export class CursoComponent {
  categoria = '';
  nombre = '';
  dificultad = '';
  mensaje = '';
  plan = '';
  tiempo_limite = '';
  frecuencia_personalizada: number | null = null;

  constructor(private api: ApiService, private router: Router) {}

  crearCurso() {
    if (!this.categoria || !this.nombre || !this.dificultad || !this.tiempo_limite) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }

    this.api.crearCurso({
      categoria: this.categoria,
      nombre: this.nombre,
      dificultad: this.dificultad,
      tiempo_limite: this.tiempo_limite,
      frecuencia_personalizada: this.frecuencia_personalizada
    }).subscribe({
      next: res => {
        this.plan = res.frecuencia_estudio || 'No definido';
        this.mensaje = res.mensaje || 'Curso creado correctamente.';
      },
      error: () => {
        this.mensaje = 'Hubo un error al crear el curso.';
      }
    });
  }
}
