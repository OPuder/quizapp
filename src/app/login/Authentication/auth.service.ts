import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly JWT_TOKEN = 'JWT_TOKEN';                                                                 // JWT token, der im LocalStorage gespeichert wird
private loggedUser? : string;                                                                             // Name des angemeldeten Users, der im LocalStorage gespeichert wird
private isAuthenticated = new BehaviorSubject<boolean>(false);                                            // BehaviorSubject, der angibt, ob der Benutzer angemeldet ist
private http = inject(HttpClient);                                                                        // Inject der HttpClient-Klasse

  constructor() { }

  login(user:{username:string, password:string}):Observable<any> {                                        // Observable der angibt, dass der Benutzer angemeldet ist          
    return this.http
      .post('https://dummyjson.com/auth/login', user)
      .pipe(                                                                                               // Verwendung der HttpClient-Klasse und des Post-Requests
        tap((response: any) => this.doLoginUser(user.username, response.token)),                            // tap-Methode, die angibt, dass der Benutzer angemeldet ist
        catchError(error => {
          // Fehlerbehandlung hier
          return throwError(error);
        })
      );
    }
  private doLoginUser(username: string, token: any) {                                                            // Methode, die angibt, dass der Benutzer angemeldet ist
    this.loggedUser = username;                                                                          // Speichern des angemeldeten Users im LocalStorage
    this.storeJwtToken(token);                                                                      // Speichern des JWT Tokens im LocalStorage
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
  }
  getcurrentAuthUser(){
    let token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get('https://dummyjson.com/auth/me',{
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
  }

}
