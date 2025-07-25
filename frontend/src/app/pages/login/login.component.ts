import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  mensaje = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.api.loginUsuario({ email: this.email, password: this.password }).subscribe({
    next: (res) => {
      this.auth.login(res.nombre, res.token);
      this.router.navigate(['/']);
    },
    error: () => {
      this.mensaje = 'Credenciales inválidas';
    }
  });

  }
}
