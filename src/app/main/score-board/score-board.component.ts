import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../login/Authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent  implements OnDestroy{

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
  user: any;
  userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.user = null; // Initialisierung des Benutzers
    this.userSubscription = this.authService.getCurrentAuthUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    // Unsubscription, um Speicherlecks zu vermeiden
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
// TEST FUNCTIONS
 };