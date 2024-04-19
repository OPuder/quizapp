import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'get start';
  showQuiz: boolean =false;    ///////TODO: wie in false ändern

 toggleQuiz(event: Event) {
  event.preventDefault();
  this.showQuiz = !this.showQuiz;
}

}
