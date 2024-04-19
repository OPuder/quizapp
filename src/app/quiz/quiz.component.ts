import { Component, OnInit } from '@angular/core';                                             // Import von Component und OnInit aus dem Angular-Core
import { Fragen } from '../fragen';                                                            // Import der Fragen-Schnittstelle aus dem Fragen-Modul
import { FragenArrayService } from '../fragen-array.service';                                  // Import des FragenArrayService aus dem Fragen-Array-Service
import { CommonModule } from '@angular/common';                                                // Import des CommonModule aus Angular für die gemeinsame Verwendung


@Component({
  selector: 'app-quiz',                                                                        // Der Selctor Name zum Aufrufen der Komponente 
  standalone: true,                                                                            // Standalone True oder False bestimmt ob sie eine Module und Routing Datei / Pfad brauch
  imports: [CommonModule,],                                                                    // Einbindung des CommonModule
  templateUrl: './quiz.component.html',                                                        // Pfad zur HTML-Datei für das Template
  styleUrl: './quiz.component.css'                                                             // Pfad zur CSS-Datei für das Styling
})
export class QuizComponent implements OnInit {

  Fragen: Fragen[] = [];                                                                       // Array für Fragen-Objekte, speichert alle Fragen des Quiz
  unbeantworteteFragen: Fragen[] = [];                                                         // Array für unbeantwortete Fragen, die der Benutzer noch nicht beantwortet hat
  quizAbgeschlossen: boolean = false;                                                          // Boolean-Wert, der angibt, ob das Quiz abgeschlossen ist
  skipRunde: boolean = false;                                                                  // Boolean-Wert, der angibt, ob Fragen übersprungen wurden
  punktzahl: number = 0;                                                                       // Die Punktzahl des Benutzers, wird aktualisiert, wenn der Benutzer Fragen richtig beantwortet
  aktuelleFrageIndex: number = 0;                                                              // Index der aktuellen Frage im Fragen-Array
  skipFragenIndex: number = 0;                                                                 // Index für übersprungene Fragen im uebersprungeneFragen-Array
  antwortIndex: number = 0;                                                                    // Index für die ausgewählte Antwort in der aktuelleAntwort
  aktuelleAntwort: string[] = [];                                                              // Array für die aktuelle Antwort des Benutzers
  skipAntwort: string[] = [];                                                                  // Array für übersprungene Antworten
  aktuelleFrage: string = "";                                                                  // Der Text der aktuellen Frage, der in der Benutzeroberfläche angezeigt wird
  skipFrage: string = "";                                                                      // Der Text der übersprungenen Frage, die in der Benutzeroberfläche angezeigt wird
  
  constructor(private fragenArrayService: FragenArrayService) {                                // Konstruktor der QuizComponent-Klasse, der den FragenArrayService als Abhängigkeit injiziert
    this.Fragen = this.fragenArrayService.getRandomFrage();                                    // Abrufen der Fragen vom FragenArrayService und Zuweisen an die Fragen-Variable der Komponente
    //console.log ("Random Fragen", this.Fragen);                                                // Ausgabe der Fragen in der Konsole zur Überprüfung
  }
  ngOnInit(): void {                                                                           // Lifecycle-Hook: Wird beim Initialisieren der Komponente aufgerufen
    this.ladeFrage();                                                                          // Methode aufrufen, um eine Frage zu laden, wenn die Komponente initialisiert wird
    this.neustart();                                                                           // Methode aufrufen, um das Quiz zu neustarten, wenn die Komponente initialisiert wird
  
  }
  ladeFrage() {                                                                                // Methode zum Laden der Fragen
    try {
      //this.Fragen = this.fragenArrayService.getFrage();                                        // Abrufen der Fragen vom Service über die getFragen() 
      if (this.Fragen.length > this.aktuelleFrageIndex) {                                      // Überprüft ob alle Fragen durchgelaufen sind
        this.aktuelleFrage = this.Fragen[this.aktuelleFrageIndex].frage;                       // Setzen der aktuellen Frage
        this.aktuelleAntwort = this.Fragen[this.aktuelleFrageIndex].antwort;                   // Setzen der Antwortmöglichkeiten
      }
      if (this.aktuelleFrageIndex === this.Fragen.length){                                     // Überprüft, ob alle Fragen einmal angezeigt wurden
        if (this.unbeantworteteFragen.length === this.skipFragenIndex){                        // Überprüft ob es skipped Fragen gibt
          this.quizAbgeschlossen = true;                                                       // Setzt Den Quiz abschluss auf true um das Ergebniss anzuzeigen
        }else{
          this.skipFragen();                                                                   // Ruft die Funktion für die übersprungenden Fragen auf 
          }
      }
    }catch (error) {
          console.error('Fehler beim Laden der Fragen:', error);                               // Fehlerbehandlung, falls das Laden der Fragen fehlschlägt
          }
  }
  fragenNummer(): number {                                                                     // Methode zum Abrufen der aktuellen Fragennummer
    const gesamtanzahlFragen = this.Fragen.length + this.unbeantworteteFragen.length;          // Gesamnteanzahl an Fragen (Fragen + skip Fragen)
    const aktuelleFragennummer = this.aktuelleFrageIndex + 1;                                  // aktuelle Fragennummer +1,weil das Array bei 0 startet

    if (aktuelleFragennummer <= gesamtanzahlFragen && aktuelleFragennummer > 0) {              // Überprüfe, ob die aktuelle Fragennummer innerhalb des gültigen Bereichs liegt
      return aktuelleFragennummer;                                                             // Rückgabe der aktuellen Fragenummer
    } else {
      console.error('Ungültige aktuelle Fragennummer:', aktuelleFragennummer);                 // Zeigt eine Fehlermeldung in der Konsole an, wenn die aktuelle Fragennummer ungültig ist
      return -1;                                                                               // Rückgabe einer ungültigen Nummer, um anzuzeigen, dass ein Fehler aufgetreten ist
    }
  }
  pruefeAntwort(antwortIndex: number) {                                                        // Methode zum Prüfen der Antwort
    try{
      this.antwortIndex = antwortIndex;                                                        // Setzen des ausgewählten Antwortindex
      if (this.Fragen.length > this.aktuelleFrageIndex){                                       // Überprüft ob alle Fragen durchgelaufen sind
        if (this.Fragen[this.aktuelleFrageIndex].correctAntwort === antwortIndex) {            // Überprüft die Antwort mit der Hinterlegten im Array
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
      }
      this.aktuelleFrageIndex ++;                                                              // Inkrementieren des FrageIndex für die nächste Frage
      this.ladeFrage();                                                                        // ruft die Funktion ladeFrage auf um die naechste Frage anzuzeigen
        }
      else {                                                                                   // Überprüfen der Antwort für übersprungene Fragen
        if (this.unbeantworteteFragen[this.skipFragenIndex].correctAntwort === antwortIndex) { // Überprüft die Antwort mit der Hinterlegten im Array 
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.skipFragenIndex++;                                                                // Inkrementieren des skipFrageIndex für die nächste Frage
        this.skipFragen();                                                                     // Aufrufen der Funktion skippedFragen, um die nächste übersprungene Frage anzuzeigen
        }
      }catch(error) {
        console.error('Fehler bei der Auswahl der Antworten', error);                          // Fängt Fehler ab und gibt sie in der Konsole aus
        }
    }
  nextFrage() {                                                                            // Methode zum Überspringen der aktuellen Frage
    try {
      if (!this.Fragen[this.aktuelleFrageIndex].skip) {                                        // Überprüfen, ob die aktuelle Frage bereits übersprungen wurde
        this.Fragen[this.aktuelleFrageIndex].skip = true;                                      // Falls nicht, markiere die Frage als übersprungen (skipped auf true setzen)
        this.unbeantworteteFragen.push(this.Fragen[this.aktuelleFrageIndex]);                  // Füge die Frage zur Liste der nicht beantworteten Fragen hinzu
        console.log("Skip Fragen Array" ,this.unbeantworteteFragen);                           // Zeige die Liste der nicht beantworteten Fragen in der Konsole an
      }
      if (this.aktuelleFrageIndex < this.Fragen.length) {                                      // Überprüfen, ob es noch weitere Fragen gibt, und ggf. zur nächsten Frage wechseln 
        this.aktuelleFrageIndex++;                                                             // Falls ja, erhöhe den Index auf die nächste Frage
        this.ladeFrage();                                                                      // Zeige die nächste Frage an
      }
    }catch (error) {
      console.error('Fehler beim Anzeigen der nächsten Frage:', error);                        // Fängt Fehler ab und gibt sie in der Konsole aus
      console.log ("Frage wurde schon einmal übersprungen");                                   // Fehlermeldung im Consolen Log
    }
  }
  skipFragen() {                                                                               // Methode zum Anzeigen der übersprungenen Fragen
    try {
      if (this.skipFragenIndex === this.unbeantworteteFragen.length) {                         // Prüft, ob alle übersprungenen Fragen angezeigt wurden
        this.quizAbgeschlossen = true;                                                         // Setzt quizAbgeschlossen auf true, um das Quiz zu beenden und den Punktestand anzuzeigen                                                                                // Beende die Methode, da das Quiz abgeschlossen ist
      }
      if (this.unbeantworteteFragen.length > this.skipFragenIndex) {                           // Prüft, ob noch weitere übersprungenen Fragen verfügbar sind
        this.skipFrage = this.unbeantworteteFragen[this.skipFragenIndex].frage;                // Lade die aktuelle Übersprungene Frage
        this.skipAntwort = this.unbeantworteteFragen[this.skipFragenIndex].antwort;            // Lade die aktuelle Übersprungene Antwort
        this.aktuelleFrage = this.skipFrage;                                                   // Setze die aktuelleFrage auf die skipFrage
        this.aktuelleAntwort = this.skipAntwort;                                               // Setze die aktuelleAntwort auf die skipAntwort
        this.skipRunde = true;                                                                 // Setze skipRunde auf true, um den Button "naechste Frage" zu deaktivieren
      }
    } catch (error) {
      console.error('Fehler beim Anzeigen der übersprungenen Fragen:', error);                 // Fängt Fehler ab und gibt sie in der Konsole aus
    }
  }
  // Funktion zum Neustarten des Quiz 
  neustart() {                                                                                 // Methode zum Neustarten des Quiz-
    this.booleanReset(this.fragenArrayService, false);                                         // Setze alle Fragen auf nicht Übersprungen     
    this.skipRunde = false;                                                                    // Setze skipRunde auf false, um den Button "naechste Frage" zu aktivieren
    this.quizAbgeschlossen = false;                                                            // Setzen des Quizstatus auf nicht abgeschlossen
    this.unbeantworteteFragen = [];                                                            // Setze die Liste der nicht beantworteten Fragen auf eine leere Liste
    this.aktuelleFrageIndex = 0;                                                               // Zurücksetzen des Frageindex
    this.skipFragenIndex = 0;                                                                  // Zurücksetzen der skipFragenIndex
    this.punktzahl = 0;                                                                        // Zurücksetzen der Punktzahl
    this.ladeFrage();                                                                          // Laden der Fragen für einen Neustart
    this.Fragen = this.fragenArrayService.getRandomFrage();                                    // Abrufen der Fragen vom FragenArrayService und Zuweisen an die Fragen-Variable der Komponente 
    //console.log("Neustart des Quiz", this.unbeantworteteFragen, this.Fragen)                   // Ausgabe der Fragen und der nicht beantworteten Fragen in der Konsole
  }
  booleanReset(service: FragenArrayService, skip: boolean) {                                   // Setze alle Fragen auf nicht Übersprungen
    for (let i = 0; i < service.fragenArray.length; i++) {                                     // für alle Fragen in der Liste
      service.fragenArray[i].skip = skip;                                                      // Setze skip auf skip
    }
  }
}
