import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizlogicService } from '../../../quiz/quizlogic.service';

@Component({
  selector: 'app-type-script-startseite',
  standalone: true,
  imports: [CommonModule,RouterLink ],
  templateUrl: './type-script-startseite.component.html',
  styleUrl: './type-script-startseite.component.css'
})
export class TypeScriptStartseiteComponent {

  constructor(private QuizlogicService: QuizlogicService) {}                 // Konstruktor der TypeScriptStartseite-Klasse, der den FragenArrayService als Abhängigkeit injiziert

  toggleQuiz(selectedCase: number) {                                         // Methode zum Umschalten des Quiz
    this.QuizlogicService.toggleQuiz(selectedCase);                          // Wechselt den Zustand des Quiz (Anzeigen/Ausblenden)
   }

}
