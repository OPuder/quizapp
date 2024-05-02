import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-type-script-startseite',
  standalone: true,
  imports: [CommonModule,RouterLink ],
  templateUrl: './type-script-startseite.component.html',
  styleUrl: './type-script-startseite.component.css'
})
export class TypeScriptStartseiteComponent {

  showQuiz: boolean = false;
  showStartseite: boolean = false;


  toggleQuiz(event: Event) {
    event.preventDefault();
    this.showQuiz = !this.showQuiz;
  }
}
