import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizSnippedComponent } from "../../quiz-snipped/quiz-snipped.component";
import { AppComponent } from "../../app.component";
import { QuizComponent } from '../../quiz/quiz.component';
import { JavaScriptStartseiteComponent } from '../quizwahl/java-script-startseite/java-script-startseite.component';

@Component({
    selector: 'app-startseite',
    standalone: true,
    templateUrl: './startseite.component.html',
    styleUrl: './startseite.component.css',
    imports: [QuizSnippedComponent, AppComponent, QuizComponent, CommonModule, JavaScriptStartseiteComponent, RouterLink, RouterLinkActive,]
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
