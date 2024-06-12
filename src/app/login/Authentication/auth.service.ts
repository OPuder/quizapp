import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly JWT_TOKEN = 'JWT_TOKEN';                                                                // JWT token, der im LocalStorage gespeichert wird
private loggedUser? : string;                                                                            // Name des angemeldeten Users, der im LocalStorage gespeichert wird
private isAuthenticated = new BehaviorSubject<boolean>(false);                                           // BehaviorSubject, der angibt, ob der Benutzer angemeldet ist
private Router=inject(Router);

constructor(private http: HttpClient) {}

  login(user:{email:string, password:string}):Observable<any> {                                          // Observable der angibt, dass der Benutzer angemeldet ist          
    return this.http
      .post('https://api.escuelajs.co/api/v1/auth/login', user)                                          // Verwendung der HttpClient-Klasse und des Post-Requests
      .pipe(                                                                                             // Verwendung der Pipe-Methode, um das Observable zu transformieren
        tap((tokens: any) => this.doLoginUser(user.email, tokens.access_token)),                         // tap-Methode, die angibt, dass der Benutzer angemeldet ist
      );
    }
  private doLoginUser(email: string, token: any) {                                                       // Methode, die angibt, dass der Benutzer angemeldet ist
    this.loggedUser = email;                                                                             // Speichern des angemeldeten Users im LocalStorage
    this.storeJwtToken(token);                                                                           // Speichern des JWT Tokens im LocalStorage
    this.isAuthenticated.next(true);                                                                     // BehaviorSubject, der angibt, dass der Benutzer angemeldet ist
  }
  private storeJwtToken(token: string) {                                                                  // Methode, die den JWT Token im LocalStorage speichert
    if (typeof localStorage !== 'undefined') {                                                            // Prüfen, ob der LocalStorage verfügbar ist
      localStorage.setItem(this.JWT_TOKEN, token);                                                        // Speichern des JWT Tokens im LocalStorage
    }
  }
  logout() {                                                                                              // Methode, die den Benutzer abmeldet
    localStorage.removeItem(this.JWT_TOKEN);                                                              // Removen des JWT Tokens aus dem LocalStorage
    this.isAuthenticated.next(false);                                                                     // BehaviorSubject, der angibt, dass der Benutzer nicht angemeldet ist
    this.Router.navigate(['/app-login']);                                                                  // Navigation zur Login-Seite
  }
    getCurrentAuthUser(): Observable<any> {                                                               // Observable, der angibt, ob der Benutzer angemeldet ist
    return this.http.get('https://api.escuelajs.co/api/v1/auth/profile');
  }
  isLoggedIn() {                                                                                          // Methode, die angibt, ob der Benutzer angemeldet ist
    return !!localStorage.getItem('JWT_TOKEN');                                                           // Prüfen, ob der JWT Token im LocalStorage vorhanden ist
  }
}
