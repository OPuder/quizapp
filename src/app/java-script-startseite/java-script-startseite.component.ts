import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-java-script-startseite',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive, QuizComponent,AppComponent ],
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
