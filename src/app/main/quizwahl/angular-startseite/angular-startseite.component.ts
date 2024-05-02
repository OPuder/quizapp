import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-angular-startseite',
  standalone: true,
  imports: [CommonModule,RouterLink],
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
