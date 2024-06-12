import { Component, OnInit } from '@angular/core';                                             // Import von Component und OnInit aus dem Angular-Core
import { CommonModule } from '@angular/common';                                                // Import des CommonModule aus Angular für die gemeinsame Verwendung
import { QuizlogicService } from '../quizlogic.service';

@Component({
  selector: 'app-quiz',                                                                        // Der Selctor Name zum Aufrufen der Komponente 
  standalone: true,                                                                            // Standalone True oder False bestimmt ob sie eine Module und Routing Datei / Pfad brauch
  imports: [CommonModule,],                                                                    // Einbindung des CommonModule
  templateUrl: './quiz.component.html',                                                        // Pfad zur HTML-Datei für das Template
  styleUrl: './quiz.component.css'                                                             // Pfad zur CSS-Datei für das Styling
})
export class QuizComponent implements OnInit {
  constructor(private quizlogicService: QuizlogicService) {                                    // Konstruktor der QuizComponent-Klasse, der den FragenArrayService als Abhängigkeit injiziert
  }
  // Getter-Funktion, um den aktuellen Wert von skipRunde aus dem Service abzurufen
  get skipRunde(): boolean {                                                                   // Getter-Funktion, um den aktuellen Wert von skipRunde aus dem Service abzurufen (Ruft jedesmal den Status ab wenn skipRunde im Service aufgerufen wird)
    return this.quizlogicService.skipRunde;                                                    // Return den Aktuellen Wert von skipRunde aus dem Service
  }
  ngOnInit(): void {                                                                           // Lifecycle-Funktion, die beim Laden der Komponente aufgerufen wird
    this.quizlogicService.initializeQuiz();                                                    // Initialisierung des Quiz beim Laden der Komponente
  }
  punktzahl() {                                                                                // Methode um den aktuellen Punktzahl aus dem Service abzurufen
    return this.quizlogicService.punktzahl;                                                    // Return den Aktuellen Wert von punktzahl aus dem Service
  }
  fragenNummer(): number | string {                                                            // Methode zum Abrufen der aktuellen Fragennummer
    return this.quizlogicService.fragenNummer();                                               // Return den Aktuellen Wert von fragenNummer aus dem Service
  }
  aktuelleFrage() {                                                                            // Methode zum Abrufen der aktuellen Frage
    return this.quizlogicService.aktuelleFrage;                                                // Return den Aktuellen Wert von aktuelleFrage aus dem Service
  }
  aktuelleAntwort() {                                                                          // Methode zum Abrufen der aktuellen Antwort der aktuellen Frage
    return this.quizlogicService.aktuelleAntwort;                                              // Return den Aktuellen Wert von aktuelleAntwort aus dem Service
  }
  pruefeAntwort(i: number) {                                                                   // Methode zum Prüfen der Antwort 
    this.quizlogicService.pruefeAntwort(i);                                                    // Aufruf der Methode pruefeAntwort aus dem Service
  }
  nextFrage() {                                                                                // Methode zum Wechseln zur nächsten Frage
    this.quizlogicService.nextFrage();                                                         // Aufruf der Methode nextFrage aus dem Service
  }
  neustart() {                                                                                 // Methode zum Neustarten des Quizzes
    this.quizlogicService.neustart();                                                          // Aufruf der Methode neustart aus dem Service
  }
  ladeFrage() {                                                                                // Methode zum Laden der naechsten Frage
    return this.quizlogicService.ladeFrage();                                                  // Aufruf der Methode ladeFrage aus dem Service
  }
  quizAbgeschlossen() {                                                                        // Methode zum Abrufen ob das Quiz abgeschlossen ist
    return this.quizlogicService.quizAbgeschlossen;                                            // Aufruf der Methode quizAbgeschlossen aus dem Service
  }
}