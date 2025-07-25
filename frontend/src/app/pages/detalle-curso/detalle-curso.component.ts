import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';


@Component({
  selector: 'app-detalle-curso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-curso.component.html',
})
export class CursoDetalleComponent implements OnInit, OnDestroy {
  cursoId: number = 0;
  curso: any = null;
  nuevoTema = {
    nombre: '',
    avance: 'bajo'
  };
  mensaje = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.cursoId = Number(this.route.snapshot.paramMap.get('id'));
    this.api.obtenerCursoDetalle(this.cursoId).subscribe({
      next: data => {
      this.curso = data;
      this.iniciarRecordatorio();  
      },

      error: () => this.mensaje = 'Error al cargar el curso.'
    });
  }

  actualizarTema(temaId: number, cambios: any) {
    this.api.actualizarTema(temaId, cambios).subscribe({
      next: () => {
        this.mensaje = 'Tema actualizado.';
        this.ngOnInit(); // Recarga los datos actualizados
      },
      error: () => this.mensaje = 'No se pudo actualizar el tema.'
    });
  }

  crearTema() {
    if (!this.nuevoTema.nombre.trim()) {
      this.mensaje = 'El nombre del tema es obligatorio.';
      return;
    }

    this.api.crearTema(this.cursoId, this.nuevoTema).subscribe({
      next: () => {
        this.mensaje = 'Tema añadido correctamente.';
        this.nuevoTema = { nombre: '', avance: 'bajo' }; // Limpiar formulario
        this.ngOnInit(); // Refrescar temas
      },
      error: () => this.mensaje = 'No se pudo añadir el tema.'
    });
  }

  intervalId: any;

  iniciarRecordatorio() {
    if (!this.curso || !this.curso.frecuencia_personalizada || !this.curso.creado || !this.curso.tiempo_limite) {
      return;
    }

    const frecuenciaMs = this.curso.frecuencia_personalizada * 60 * 1000;

    const inicio = new Date(this.curso.creado).getTime();
    const fin = inicio + this.curso.tiempo_limite * 24 * 60 * 60 * 1000;

    this.intervalId = setInterval(() => {
      const ahora = Date.now();
      if (ahora >= fin) {
        clearInterval(this.intervalId);
        console.log('Se alcanzó el tiempo límite del curso.');
        return;
      }
      alert('¡Es hora de estudiar tu curso: ' + this.curso.nombre + '!');
    }, frecuenciaMs);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
