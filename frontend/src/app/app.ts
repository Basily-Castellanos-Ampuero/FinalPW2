import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
})
export class AppComponent {
  constructor(public auth: AuthService) {
    this.auth.cargarEstado();
  }

  logout() {
    this.auth.logout();
  }
}
