import { provideHttpClient, withFetch  } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), { provide: LOCALE_ID, useValue: 'en-US' }]
};
