import { provideHttpClient, withFetch, withInterceptors  } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { authInterceptor } from './login/AuthService/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), 
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};
