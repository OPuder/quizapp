import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizComponent } from '../../../quiz/quiz/quiz.component';
import { RouterLink } from '@angular/router';
import { QuizlogicService } from '../../../quiz/quizlogic.service';



@Component({
  selector: 'app-java-script-startseite',
  standalone: true,
  imports: [CommonModule, QuizComponent,RouterLink ],
  templateUrl: './java-script-startseite.component.html',
  styleUrl: './java-script-startseite.component.css'
})
export class JavaScriptStartseiteComponent {

  constructor(private QuizlogicService: QuizlogicService) {}             // Konstruktor der JavaScriptStartseite-Klasse, der den FragenArrayService als Abhängigkeit injiziert
  toggleQuiz(selectedCase: number) {                                     // Methode zum Umschalten des Quiz
    this.QuizlogicService.toggleQuiz(selectedCase);                      // Wechselt den Zustand des Quiz (Anzeigen/Ausblenden)
   }


}
