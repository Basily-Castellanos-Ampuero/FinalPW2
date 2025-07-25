import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CursoComponent } from './pages/curso/curso.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { CursoDetalleComponent } from './pages/detalle-curso/detalle-curso.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent) },
  { path: 'curso', component: CursoComponent },
  { path: 'mis-cursos', component: MisCursosComponent },
  { path: 'curso/:id', component: CursoDetalleComponent },
];
