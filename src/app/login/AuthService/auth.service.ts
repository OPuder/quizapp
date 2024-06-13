import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly JWT_TOKEN = 'JWT_TOKEN';                                                                // JWT token, der im LocalStorage gespeichert wird
private loggedUser? : string;                                                                            // Name des angemeldeten Users, der im LocalStorage gespeichert wird
private isAuthenticated = new BehaviorSubject<boolean>(false);                                           // BehaviorSubject, der angibt, ob der Benutzer angemeldet ist
private Router=inject(Router);
private http = inject(HttpClient);

constructor() {}

  login(user:{email:string; password:string}):Observable<any> {                                          // Observable der angibt, dass der Benutzer angemeldet ist          
    return this.http
      .post('https://api.escuelajs.co/api/v1/auth/login', user)                                          // Verwendung der HttpClient-Klasse und des Post-Requests
      .pipe(                                                                                             // Verwendung der Pipe-Methode, um das Observable zu transformieren
        tap((tokens: any) =>                                                                             // Verwendung der tap-Methode, um die Tokens zu speichern
          this.doLoginUser(user.email, JSON.stringify(tokens))                                           // Aufruf der Methode, die angibt, dass der Benutzer angemeldet ist
        ),                                         
      );
    }
  private doLoginUser(email: string, token: any) {                                                       // Methode, die angibt, dass der Benutzer angemeldet ist
    this.loggedUser = email;                                                                             // Speichern des angemeldeten Users im LocalStorage
    this.storeJwtToken(token);                                                                           // Speichern des JWT Tokens im LocalStorage
    this.isAuthenticated.next(true);                                                                     // BehaviorSubject, der angibt, dass der Benutzer angemeldet ist
  }
  private storeJwtToken(jwt: string) {                                                                   // Methode, die den JWT Token im LocalStorage speichert
   localStorage.setItem(this.JWT_TOKEN, jwt);                                                            // Speichern des JWT Tokens im LocalStorage
  }
  logout() {                                                                                              // Methode, die den Benutzer abmeldet
    localStorage.removeItem(this.JWT_TOKEN);                                                              // Removen des JWT Tokens aus dem LocalStorage
    this.isAuthenticated.next(false);                                                                     // BehaviorSubject, der angibt, dass der Benutzer nicht angemeldet ist
    this.Router.navigate(['/app-login']);                                                                 // Navigation zur Login-Seite
  }
    getCurrentAuthUser(): Observable<any> {                                                               // Observable, der angibt, ob der Benutzer angemeldet ist
    return this.http.get('https://api.escuelajs.co/api/v1/auth/profile');
  }
  isLoggedIn() {                                                                                          // Methode, die angibt, ob der Benutzer angemeldet ist
    return !!localStorage.getItem(this.JWT_TOKEN);                                                        // Prüfen, ob der JWT Token im LocalStorage vorhanden ist
  }
  isTokenExpired() {                                                                                       // Methode, die angibt, ob der Token abgelaufen ist
    const tokens =localStorage.getItem(this.JWT_TOKEN);                                                    // Auslesen des JWT Tokens aus dem LocalStorage
    if (!tokens) {                                                                                         // Prüfen, ob der JWT Token vorhanden ist
      return true;                                                                                         // Wenn der JWT Token nicht vorhanden ist, wird true zurückgeliefert
    }
    const token = JSON.parse(tokens).access_token;                                                         // Parsen des JWT Tokens
    const decoded = jwtDecode(token);                                                                      // Decodieren des JWT Tokens
    if (!decoded.exp) {                                                                                    // Prüfen, ob das Decodieren des JWT Tokens erfolgreich war
      return true;                                                                                         // Wenn das Decodieren des JWT Tokens nicht erfolgreich war, wird true zurückgeliefert
    }                                                                                      
      const expirationDate = decoded.exp * 1000;                                                           // Auslesen der Verfallszeit des JWT Tokens
      const now = new Date().getTime();                                                                    // Auslesen der aktuellen Zeit
      return expirationDate < now;                                                                         // Ueberpruefen, ob die Verfallszeit des JWT Tokens abgelaufen ist                                                           
    }
  refreshToken() {                                                                                        // Methode, die den JWT Token aktualisiert
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);                                                // Auslesen des JWT Tokens aus dem LocalStorage
    if (!tokens) {
      return;                                                                                              // Wenn der LocalStorage nicht verfügbar ist, wird nichts zurückgeliefert
    }
    tokens = JSON.parse(tokens);                                                                           // Parsen des JWT Tokens
    let refreshToken = tokens.refresh_token;                                                               // Auslesen des Refresh Tokens aus dem JWT Token
    return this.http                                                                                       // Verwendung der HttpClient-Klasse und des Post-Requests
      .post<any>('https://api.escuelajs.co/api/v1/auth/refresh-token',{                                    // Post-Request, um den Refresh-Token zu aktualisieren
        refreshToken,                                                                                      // Setzen des Refresh Tokens im Body des Requests
      }) 
      .pipe(
        tap((tokens: any) =>                                                                               // Verwendung der tap-Methode, um die Tokens zu speichern
          this.storeJwtToken(JSON.stringify(tokens))                                                       // Aufruf der Methode, die angibt, dass der Benutzer angemeldet ist
        )
      );
  }
}
