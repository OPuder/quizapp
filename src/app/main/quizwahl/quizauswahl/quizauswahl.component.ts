import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JavaScriptStartseiteComponent } from '../java-script-startseite/java-script-startseite.component';


@Component({
  selector: 'app-quizauswahl',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './quizauswahl.component.html',
  styleUrls: ['./quizauswahl.component.css']
})
export class QuizauswahlComponent {
  constructor() { } 

}
