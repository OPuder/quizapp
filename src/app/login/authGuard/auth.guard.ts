import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

export const authGuard: CanActivateFn = (route, state) => {                                    // Guard, der prüft, ob der Benutzer eingeloggt ist
  const authService = inject(AuthService);                                                     // Inject der AuthService-Klasse
  const routerService = inject(Router);                                                        // Inject der Router-Klasse

  console.log('AuthGuard aufgerufen');                                                         // Ausgabe in der Console, dass die AuthGuard-Klasse aufgerufen wurde
  console.log('Benutzer eingeloggt:', authService.isLoggedIn());                               // Ausgabe in der Console, ob der Benutzer eingeloggt ist

  if (!authService.isLoggedIn()) {                                                             // Prüfen, ob der Benutzer angemeldet ist
    console.log('Benutzer ist nicht eingeloggt, weiterleiten zur Login-Seite');                // Ausgabe in der Console, dass der Benutzer nicht angemeldet ist
    routerService.navigate(['/app-login']);                                                    // Navigation zur Login-Seite
    return false;                                                                              // False zurückgeben und Route nicht erlaubt
  }
  console.log('Benutzer ist eingeloggt, Zugang zur Route erlaubt');                            // Ausgabe in der Console, dass der Benutzer angemeldet ist und Zugang erlaubt
  return true;                                                                                 // True zurückgeben und Route erlaubt
};
