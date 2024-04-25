import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizComponent } from '../../../quiz/quiz.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-java-script-startseite',
  standalone: true,
  imports: [CommonModule, QuizComponent,RouterLink ],
  templateUrl: './java-script-startseite.component.html',
  styleUrl: './java-script-startseite.component.css'
})
export class JavaScriptStartseiteComponent {

  showQuiz: boolean = false;
  showStartseite: boolean = false;


  toggleQuiz(event: Event) {
    event.preventDefault();
    this.showQuiz = !this.showQuiz;
  }


}
