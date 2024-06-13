import { HttpInterceptorFn } from '@angular/common/http';                                     // Import der HttpInterceptorFn-Klasse
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
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {                  // Prüfen, ob der LocalStorage verfügbar ist
    return null;                                                                               // Wenn der LocalStorage nicht verfügbar ist, wird null zurückgeliefert
  }

  let tokens: any = localStorage.getItem('JWT_TOKEN');                                         // Auslesen des JWT Tokens aus dem LocalStorage
  if (!tokens) {                                                                               // Prüfen, ob der LocalStorage verfügbar ist
    return null;                                                                               // Wenn der LocalStorage nicht verfügbar ist, wird null zurückgeliefert
  }
  const token = JSON.parse(tokens).access_token;                                               // Parsen des JWT Tokens
  return token;                                                                                // Ausgabe des JWT Tokens
};
