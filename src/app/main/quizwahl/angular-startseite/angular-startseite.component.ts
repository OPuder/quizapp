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

  showQuiz: boolean = false;                                                                //  Flag, um zu zeigen, ob das Quiz angezeigt werden soll
  showStartseite: boolean = false;                                                          //  Flag, um zu zeigen, ob die Startseite angezeigt werden soll


  toggleQuiz(event: Event) {                                                                //  Methode zum Umschalten des Quiz
    event.preventDefault();                                                                 //  Verhindert das Standardverhalten des Ereignisses
    this.showQuiz = !this.showQuiz;                                                         //  Wechselt den Zustand des Quiz (Anzeigen/Ausblenden)
  }
}
