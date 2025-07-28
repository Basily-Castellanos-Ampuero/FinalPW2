import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet, RouterModule]
})
export class AppComponent {
  darkMode = false;
  constructor(
    public auth: AuthService, 
    private router: Router
  ) {
    this.auth.cargarEstado(); 
    this.loadDarkMode();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
    toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode ? '1' : '0');
  }
  loadDarkMode() {
    const dark = localStorage.getItem('darkMode') === '1';
    this.darkMode = dark;
    if (dark) document.body.classList.add('dark-mode');
  }
  alertaEstudia(): void {
   alert('¡Estudia!');
  }
}

