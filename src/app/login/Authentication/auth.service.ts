import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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
    return this.http.post('https://dummyjson.com/auth/login', user).pipe(                                 // Verwendung der HttpClient-Klasse und des Post-Requests
      tap((response: any) => this.doLoginUser(user.username, response.token)),                            // tap-Methode, die angibt, dass der Benutzer angemeldet ist
    );
  }
  doLoginUser(username: string, token: any) {                                                            // Methode, die angibt, dass der Benutzer angemeldet ist
    this.loggedUser = username;                                                                          // Speichern des angemeldeten Users im LocalStorage
    this.storeJwtTokens(token.jwt);                                                                      // Speichern des JWT Tokens im LocalStorage
    this.isAuthenticated.next(true);                                                                     // BehaviorSubject, der angibt, dass der Benutzer angemeldet ist
  }
  storeJwtTokens(jwt: string) {                                                                           // Methode, die Speichert den JWT Tokens im LocalStorage
    localStorage.setItem(this.JWT_TOKEN, jwt);                                                           
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
