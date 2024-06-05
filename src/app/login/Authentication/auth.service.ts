import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  login(user:{username:string, password:string}):Observable<any> {
    return this.http.post('/api/login', user).pipe(
      tap(tokens => this.doLoginUser(user.username, tokens)),
    );
  }
  doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeJwtTokens(tokens.jwt);
    this.isAuthenticated.next(true);
  }
  storeJwtTokens(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticated.next(false);
  }
  
}
