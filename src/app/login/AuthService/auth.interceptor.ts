import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {                            // Interceptor-Funktion, die die Authentifizierungsmethode angibt
  const jwtToken = getJwtToken();                                                             // Auslesen des JWT Tokens aus dem LocalStorage
  if (jwtToken) {                                                                             // Prüfen, ob der JWT Token vorhanden ist
    const clonedReg = req.clone({                                                             // Kopie des Request-Objekts erstellen
      setHeaders: {                                                                           // Setzen der HTTP-Headers
        Authorization: `Bearer ${jwtToken}`,                                                  // Setzen des HTTP-Headers mit dem JWT Token
      },
    });
    return next(clonedReg);                                                                   // Verwendung der next-Methode mit der Kopie des Request-Objekts
  }
  return next(req);                                                                           // Verwendung der next-Methode mit dem Original-Request-Objekt
};


function getJwtToken(): string | null {                                                        // Methode, die den JWT Token aus dem LocalStorage liest
  if (typeof window !== 'undefined' && window.localStorage) {                                  // Prüfen, ob der LocalStorage verfügbar ist
    return localStorage.getItem('JWT_TOKEN');                                                  // Auslesen des JWT Tokens aus dem LocalStorage
  }
  return null;                                                                                // Wenn der LocalStorage nicht verfügbar ist, wird null zurückgeliefert
}

