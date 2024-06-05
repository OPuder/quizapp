import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private readonly JWT_TOKEN = 'JWT_TOKEN';                                                                 // JWT token, der im LocalStorage gespeichert wird
private loggedUser? : string;                                                                             // Name des angemeldeten Users, der im LocalStorage gespeichert wird
private isAuthenticated = new BehaviorSubject<boolean>(false);                                            // BehaviorSubject, der angibt, ob der Benutzer angemeldet ist
//private http = inject(HttpClient);                                                                        // Inject der HttpClient-Klasse

constructor(private http: HttpClient) {}

  login(user:{username:string, password:string}):Observable<any> {                                        // Observable der angibt, dass der Benutzer angemeldet ist          
    return this.http
      .post('https://dummyjson.com/auth/login', user)
      .pipe(                                                                                               // Verwendung der HttpClient-Klasse und des Post-Requests
        tap((res: any) => this.doLoginUser(user.username, res.token)),                                     // tap-Methode, die angibt, dass der Benutzer angemeldet ist
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
    getCurrentAuthUser(): Observable<any> {
    if (typeof localStorage === 'undefined') {
      // Alternative Logik oder Rückgabe eines Fehlers
      console.error('localStorage is not available');
      return new Observable(observer => {
        observer.error('localStorage is not available2');
      });
    }
    let token = localStorage.getItem(this.JWT_TOKEN);
    return this.http.get('https://dummyjson.com/auth/me');
  }
}
