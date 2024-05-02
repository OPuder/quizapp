import { RouterLink, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';
import { CommonModule } from '@angular/common';
import { QuizSnippedComponent } from './quiz-snipped/quiz-snipped.component';
import { JavaScriptStartseiteComponent } from './main/quizwahl/java-script-startseite/java-script-startseite.component';
import { StartseiteComponent } from './main/startseite/startseite.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterModule,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'get started';
  showQuiz: boolean = false;

  toggleQuiz(event: Event) {
    event.preventDefault();
    this.showQuiz = !this.showQuiz;
  }
  
}
