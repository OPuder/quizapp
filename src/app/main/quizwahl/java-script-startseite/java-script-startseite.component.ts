import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizComponent } from '../../../quiz/quiz.component';
import { RouterLink } from '@angular/router';
import { QuizlogicService } from '../../../quizlogic.service';



@Component({
  selector: 'app-java-script-startseite',
  standalone: true,
  imports: [CommonModule, QuizComponent,RouterLink ],
  templateUrl: './java-script-startseite.component.html',
  styleUrl: './java-script-startseite.component.css'
})
export class JavaScriptStartseiteComponent {

  constructor(private QuizlogicService: QuizlogicService) {}
  toggleQuiz(selectedCase: number) {
    this.QuizlogicService.toggleQuiz(selectedCase);
   }


}
