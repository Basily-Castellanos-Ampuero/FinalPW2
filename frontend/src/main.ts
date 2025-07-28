import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import {
  provideHttpClient,
  withInterceptors,
  withFetch
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/auth.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

bootstrapApplication(AppComponent, {
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    provideHttpClient(
      withFetch(), 
      withInterceptors([AuthInterceptor]),
      
    )
  ]
});
