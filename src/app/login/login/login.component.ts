import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],                                                   // Verwendung der FormsModule-Klasse für das Formular mit Eingabefeldern und Schaltflächen
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);                                                               // Inject der Router-Klasse
  authService = inject(AuthService);                                                     // Inject der AuthService-Klasse 
  email: string = "";                                                                    // Benutzername 
  password: string = "";                                                                 // Passwort

  login(event:Event){                                                                    // Methode, die angibt, dass der Benutzer angemeldet ist
    event.preventDefault();                                                              // Verwendung der preventDefault-Methode, um das Ereignis auszuloßen
    this.authService                                                                     // Verwendung der AuthService-Klasse
   .login({                                                                              // Verwendung der login-Methode
     email: this.email,                                                                  // Verwendung der email-Properties
     password: this.password                                                             // Verwendung der password-Properties
   })
   .subscribe(() => {                                                                    // Verwendung der subscribe-Methode
    alert('Login successful');                                                           // Verwendung der alert-Methode zum bestätigen der Anmeldung
    this.router.navigate(['/app-score-board']);                                          // Verwendung der navigate-Methode zum Wechsel zur Score-Board-Seite
   });
  }
}
