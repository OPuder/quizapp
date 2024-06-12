import { QuizlogicService } from '../../quiz/quizlogic.service';                                  // Import der Service-Klasse
import { RouterLink, RouterLinkActive } from '@angular/router';                                   // Import der Router-Klassen
import { CommonModule } from '@angular/common';                                                   // Import des CommonModule
import { Component } from '@angular/core';                                                        // Import der Komponenten-Klasse
import { QuizSnippedComponent } from '../../quiz/quiz-snipped/quiz-snipped.component';            // Import der QuizSnipped-Komponente

@Component({                                                                                      // Deklaration der Startseite-Komponente
  selector: 'app-startseite',                                                                     // Selector für die Startseite-Komponente
  standalone: true,                                                                               // Standalone True oder False bestimmt ob sie eine Module und Routing Datei / Pfad braucht
  templateUrl: './startseite.component.html',                                                     // Pfad zur HTML-Datei für das Template der Startseite
  styleUrl: './startseite.component.css',                                                         // Pfad zur CSS-Datei für das Styling der Startseite
  imports: [CommonModule, RouterLink, QuizSnippedComponent]                                       // Einbindung des CommonModule, RouterLink und der QuizSnippedComponent
})
export class StartseiteComponent {                                                                // Klasse der Startseite-Komponente 
title = 'get started';                                                                            // Titel für die Startseite
startSeite: boolean = true;                                                                       // Variable für die Startseiten-Anzeige
showQuiz: boolean = false;                                                                        // Variable zum Anzeigen des Quiz

constructor(private QuizlogicService: QuizlogicService) {}                                        // Konstruktor der Startseite-Komponente

// Methode zum Umschalten des Quiz
toggleQuiz(event: Event, selectedCase: number) {                                                  // Methode zum Umschalten des Quiz
 event.preventDefault();                                                                          // Verhindert das Standardverhalten des Ereignisses
 this.showQuiz = !this.showQuiz;                                                                  // Wechselt den Zustand des Quiz (Anzeigen/Ausblenden)
 this.QuizlogicService.toggleQuiz(selectedCase);                                                  // Ruft die Methode zum Starten des Quiz mit dem ausgewählten Fall auf
}
}
