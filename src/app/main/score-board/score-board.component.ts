import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../login/AuthService/auth.service';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent{

  players = [
    { name: 'TestPerson', score: 0 },
    { name: 'Platzhalter', score: 0 },
    { name: 'Egalomart', score: 0 }
  ];

  incrementScore(player: any) {
    player.score++;
  }

  decrementScore(player: any) {
    if (player.score > 0) {
      player.score--;
    }
  }
// TEST  FUNCTIONS 
authService = inject(AuthService);                                      // Inject der AuthService-Klasse
user?: any;                                                             // Variable zum Speichern des aktuellen Benutzers

constructor() {                                                         // Konstruktor
  this.authService.getCurrentAuthUser().subscribe((r) => {              // Subscribe zum aktualisieren des aktuellen Benutzers  
    console.log(r);                                                     // Ausgabe in der Konsole
    this.user = r;                                                      // Speichern des aktuellen Benutzers
  });
}

logout() {                                                              // Methode, die den Benutzer abmeldet
  this.authService.logout();                                            // Aufruf der logout-Methode
}

  refreshToken() {                                                     // Methode, die den Refresh-Token aktualisiert
    this.authService.refreshToken()?.subscribe(() => {});              // Aufruf der refreshToken-Methode mit der subscribe-Methode 
  }
// TEST FUNCTIONS
 };