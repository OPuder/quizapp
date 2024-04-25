import { Component, OnInit } from '@angular/core';                                             // Import von Component und OnInit aus dem Angular-Core
import { CommonModule } from '@angular/common';                                                // Import des CommonModule aus Angular für die gemeinsame Verwendung
import { QuizlogicService } from '../quizlogic.service';


@Component({
  selector: 'app-quiz-Snipped',                                                                        // Der Selctor Name zum Aufrufen der Komponente 
  standalone: true,                                                                            // Standalone True oder False bestimmt ob sie eine Module und Routing Datei / Pfad brauch
  imports: [CommonModule, ],                                                                    // Einbindung des CommonModule
  templateUrl: './quiz-snipped.component.html',                                                        // PfaaktuelleFrageIndex?: anyd zur HTML-Datei für das Template
  styleUrl: './quiz-snipped.component.css'                                                             // Pfad zur CSS-Datei für das Styling
})
export class QuizSnippedComponent implements OnInit {
  

  constructor(private quizlogicService: QuizlogicService) {                                // Konstruktor der QuizComponent-Klasse, der den FragenArrayService als Abhängigkeit injiziert
  }
  ngOnInit(): void {
    this.quizlogicService.initializeQuiz(); // Initialisierung des Quiz beim Laden der Komponente
  }
punktzahl() {
  return this.quizlogicService.punktzahl;
}
fragenNummer(): number | string {
  return this.quizlogicService.fragenNummer();
}
aktuelleFrage() {
  return this.quizlogicService.aktuelleFrage;
}
aktuelleAntwort() {
  return this.quizlogicService.aktuelleAntwort;
}
pruefeAntwort(i: number) {
  this.quizlogicService.pruefeAntwort(i);
}
nextFrage() {
  this.quizlogicService.nextFrage();
}
neustart() {
  this.quizlogicService.neustart();
}
ladeFrage(){
  return this.quizlogicService.ladeFrage();
}
quizAbgeschlossen(){
  return this.quizlogicService.quizAbgeschlossen;
}

}