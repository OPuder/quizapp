import { Component } from '@angular/core';
import { RouterOutlet,RouterLink, RouterLinkActive } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { CommonModule } from '@angular/common';
import {QuizSnippedComponent} from './quiz-snipped/quiz-snipped.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuizComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, QuizSnippedComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'get start';
  showQuiz: boolean = false;
  startSeite: boolean = true;

 toggleQuiz(event: Event) {
  event.preventDefault();
  this.showQuiz = !this.showQuiz;
}

toggleStartSeite(event: Event) {
  event.preventDefault();
  this.startSeite = false;
}
}
