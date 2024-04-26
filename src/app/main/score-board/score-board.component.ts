import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent {

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
}
