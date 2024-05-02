import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuizSnippedComponent } from '../../quiz-snipped/quiz-snipped.component';


@Component({
    selector: 'app-startseite',
    standalone: true,
    templateUrl: './startseite.component.html',
    styleUrl: './startseite.component.css',
    imports: [CommonModule, RouterLink,HttpClientModule,QuizSnippedComponent]
})
export class StartseiteComponent {
  title = 'get started';
  startSeite: boolean = true;
  showQuiz: boolean = false;

  toggleQuiz(event: Event) {
    event.preventDefault();
    this.showQuiz = !this.showQuiz;
  }
  
  toggleStartSeite(event: Event) {
    event.preventDefault();
    this.startSeite = false;
  }
}
