import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-startseite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular-startseite.component.html',
  styleUrl: './angular-startseite.component.css'
})
export class AngularStartseiteComponent {

  showQuiz: boolean = false;
  showStartseite: boolean = false;


  toggleQuiz(event: Event) {
    event.preventDefault();
    this.showQuiz = !this.showQuiz;
  }
}
