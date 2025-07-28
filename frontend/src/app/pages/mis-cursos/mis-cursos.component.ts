import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css'],
  imports: [CommonModule, RouterModule]
})
export class MisCursosComponent implements OnInit {
  cursos: any[] = [];
  mensaje = ''; 

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.obtenerCursos(); 
  }

  obtenerCursos() {
    this.api.obtenerCursosDelUsuario().subscribe({
      next: (res) => this.cursos = res,
      error: () => this.mensaje = 'Error al obtener los cursos'
    });
  }

  eliminarCurso(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.api.eliminarCurso(id).subscribe({
        next: () => {
          this.mensaje = 'Curso eliminado correctamente.';
          this.obtenerCursos(); // recargar lista
        },
        error: () => this.mensaje = 'No se pudo eliminar el curso.'
      });
    }
  }
}
