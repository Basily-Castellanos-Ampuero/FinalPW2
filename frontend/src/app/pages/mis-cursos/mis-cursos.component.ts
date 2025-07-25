import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  imports: [CommonModule, RouterModule]
})
export class MisCursosComponent implements OnInit {
  cursos: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.obtenerCursosDelUsuario().subscribe({
      next: (res) => this.cursos = res,
      error: () => console.error('Error al obtener los cursos'),
    });
    console.log(this.cursos);
  }
}
