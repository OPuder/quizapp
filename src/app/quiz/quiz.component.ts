// Import der benötigten Module und Komponenten
import { Fragen } from './../fragen';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragenArrayService } from '../fragen-array.service';

// Deklaration der Komponente
@Component({
  selector: 'app-quiz',                                                                      // Der Selctor Name zum Aufrufen der Komponente 
  standalone: true,                                                                          // Standalone True oder False bestimmt ob sie eine Module und Routing Datei / Pfad brauch
  imports: [CommonModule,],                                                                  // Einbindung des CommonModule
  templateUrl: './quiz.component.html',                                                      // Pfad zur HTML-Datei für das Template
  styleUrl: './quiz.component.css'                                                           // Pfad zur CSS-Datei für das Styling
})

 export class QuizComponent implements OnInit {       
    fragen: Fragen[] = [];                                                                   // Array für Fragen-Objekte
    randomFragen: Fragen[] = [];                                                             // Array für Random  Fragen-Objekte
    aktuelleFrageIndex: number = 0;                                                          // Index der aktuellen Frage
    aktuelleFrage: string = '';                                                              // Text der aktuellen Frage
    aktuelleAntwort: string[] = [];                                                          // Array für Antwortmöglichkeiten der aktuellen Frage
    antwortIndex!: number;                                                                   // Index der ausgewählten Antwort
    punktzahl = 0;                                                                           // Punktzahl des Benutzers
    quizAbgeschlossen = false;                                                               // Boolean, ob das Quiz abgeschlossen wurde
    skipFragenArray:Fragen[] = [];                                                           // Ein Array wo die unbeantworteten Fragen rein kommen 
    skipFragenIndex :number = 0;                                                             // Ein Index für die unbeantworteten Fragen
    skipFrage: string = '';                                                                  // Die Skipped Fragend
    skipAntwort: string[] = [];                                                              // Die Skipped Antworten
    skipRunde: boolean = false;                                                               

    constructor(private fragenArrayService: FragenArrayService) {                            // Konstruktor mit Dependency Injection für den Frage-Service
      this.fragen = this.fragenArrayService.getRandomFragen();
      console.log ("Random Fragen", this.fragen);
    }
  
    // Lifecycle-Hook: Wird beim Initialisieren der Komponente aufgerufen
    ngOnInit(): void { 
      this.ladeFragen();                                                                     // Laden der Fragen beim Initialisieren
    }

     // Funktion zum Laden der Fragen aus dem Fragen-Service
    ladeFragen() {
      try {
        //this.fragen = this.fragenArrayService.getFragen();                                   // Abrufen der Fragen vom Service über die getFragen() 
        if (this.fragen.length > this.aktuelleFrageIndex) {                                  // Überprüft ob alle Fragen durchgelaufen sind
          this.aktuelleFrage = this.fragen[this.aktuelleFrageIndex].question;                // Setzen der aktuellen Frage
          this.aktuelleAntwort = this.fragen[this.aktuelleFrageIndex].answers;               // Setzen der Antwortmöglichkeiten
        }
        if (this.aktuelleFrageIndex === this.fragen.length){                                 // Überprüft, ob alle Fragen einmal angezeigt wurden
          if (this.skipFragenArray.length === this.skipFragenIndex){                         // Überprüft ob es skipped Fragen gibt
            this.quizAbgeschlossen = true;                                                   // Setzt Den Quiz abschluss auf true um das Ergebniss anzuzeigen
          }else{
            this.skippedFragen();                                                            // Ruft die Funktion für die übersprungenden Fragen auf 
            }
        }
      }catch (error) {
            console.error('Fehler beim Laden der Fragen:', error);                           // Fehlerbehandlung, falls das Laden der Fragen fehlschlägt
            }
    }
    // Funktion zum Laden der aktuellen Fragenummer
    ladeFragenNummer(): number {
      const gesamtanzahlFragen = this.fragen.length + this.skipFragenArray.length;           // Gesamnteanzahl an Fragen (Fragen + skip Fragen)
      const aktuelleFragennummer = this.aktuelleFrageIndex + 1;                              // aktuelle Fragennummer +1,weil das Array bei 0 startet

      if (aktuelleFragennummer <= gesamtanzahlFragen && aktuelleFragennummer > 0) {          // Überprüfe, ob die aktuelle Fragennummer innerhalb des gültigen Bereichs liegt
        return aktuelleFragennummer;                                                         // Rückgabe der aktuellen Fragenummer
      } else {
        console.error('Ungültige aktuelle Fragennummer:', aktuelleFragennummer);             // Zeigt eine Fehlermeldung in der Konsole an, wenn die aktuelle Fragennummer ungültig ist
        return -1;                                                                           // Rückgabe einer ungültigen Nummer, um anzuzeigen, dass ein Fehler aufgetreten ist
      }
    }

    // Funktion zum Überprüfen der ausgewählten Antwort
    pruefeAntwort(antwortIndex: number) {                                                     
      try{
      this.antwortIndex = antwortIndex;                                                      // Setzen des ausgewählten Antwortindex
      if (this.fragen.length > this.aktuelleFrageIndex){
        if (this.fragen[this.aktuelleFrageIndex].correctAnswer === antwortIndex) {           // Überprüft die Antwort mit der Hinterlegten im Array
          this.punktzahl++;                                                                  // Erhöhen der Punktzahl bei richtiger Antwort
      }
      this.aktuelleFrageIndex ++;                                                            // Inkrementieren des FrageIndex für die nächste Frage
      this.ladeFragen();                                                                     // ruft die Funktion ladeFrage auf um die naechste Frage anzuzeigen
        }
      else {                                                                                 // Überprüfen der Antwort für übersprungene Fragen
        if (this.skipFragenArray[this.skipFragenIndex].correctAnswer === antwortIndex) {     // Überprüft die Antwort mit der Hinterlegten im Array 
          this.punktzahl++;                                                                  // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.skipFragenIndex++;                                                              // Inkrementieren des skipFrageIndex für die nächste Frage
        this.skippedFragen();                                                                // Aufrufen der Funktion skippedFragen, um die nächste übersprungene Frage anzuzeigen
        }
      }catch(error) {
        console.error('Fehler bei der Auswahl der Antworten', error);                            // Fängt Fehler ab und gibt sie in der Konsole aus
        }
    }
    // Funktion zum Anzeigen der nächsten Frage über den Button Nächste Frage
    nextFrage(): void{
      try {
        if (!this.fragen[this.aktuelleFrageIndex].skipped) {                                 // Überprüfen, ob die aktuelle Frage bereits übersprungen wurde
          this.fragen[this.aktuelleFrageIndex].skipped = true;                               // Falls nicht, markiere die Frage als übersprungen (skipped auf true setzen)
          this.skipFragenArray.push(this.fragen[this.aktuelleFrageIndex]);                   // Füge die Frage zur Liste der nicht beantworteten Fragen hinzu
          console.log("Skip Fragen Array" ,this.skipFragenArray);
        }
        if (this.aktuelleFrageIndex < this.fragen.length) {                                  // Überprüfen, ob es noch weitere Fragen gibt, und ggf. zur nächsten Frage wechseln 
          this.aktuelleFrageIndex++;                                                         // Falls ja, erhöhe den Index auf die nächste Frage
          this.ladeFragen();                                                                 // Zeige die nächste Frage an
        }
      }catch (error) {
        console.error('Fehler beim Anzeigen der nächsten Frage:', error);                    // Fängt Fehler ab und gibt sie in der Konsole aus
        console.log ("Frage wurde schon einmal übersprungen");                               // Fehlermeldung im Consolen Log
      }
    }
    
    // Funktion zum Anzeigen der übersprungen Fragen
    skippedFragen():void {
      try{
    if (this.skipFragenIndex === this.skipFragenArray.length){                               //Überprüft ob alle übersprungen Fragen abgerufen wurde 
      this.quizAbgeschlossen = true;                                                         // Setzt quizAbgeschlossen auf true um das Quiz zu beenden so das der Punktstand angezeit wird
    }
    if (this.skipFragenArray.length > this.skipFragenIndex){                                 // Überprüft ob alle Fragen durch gelaufen sind
    this.skipFrage = this.skipFragenArray[this.skipFragenIndex].question;                    // Setzen der aktuellen Frage
    this.skipAntwort = this.skipFragenArray[this.skipFragenIndex].answers;                   // Setzen der Antwortmöglichkeiten
    this.aktuelleFrage = this.skipFrage;
    this.aktuelleAntwort = this.skipAntwort;
    this.skipRunde = true;
    }
    } catch (error) {
    console.error('Fehler beim Anzeigen der übersprungenen Fragen:', error);                 // Fängt Fehler ab und gibt sie in der Konsole aus
  }
    }
    // Funktion zum Neustarten des Quiz 
    neustart() {
      this.skipRunde = false;
      this.quizAbgeschlossen = false;                                                        // Setzen des Quizstatus auf nicht abgeschlossen
      this.skipFragenIndex = 0;                                                              // Zurücksetzten des skip Fragenindex
      this.skipFragenArray = [];                                                             // Leeren des skip Fragen Array
      this.aktuelleFrageIndex = 0;                                                           // Zurücksetzen des Frageindex
      this.punktzahl = 0;                                                                    // Zurücksetzen der Punktzahl
      this.booleanReset(this.fragenArrayService, false);                                     // Zurücksetzten des Skip Wertes
      this.fragen = this.fragenArrayService.getRandomFragen();                               // Zum durchmischen beim Neustart
      this.ladeFragen();                                                                     // Laden der Fragen für einen Neustart
      console.log("Neustart des Quiz", this.skipFragenArray, this.fragen)                    // Consolen Log Abfrage nach dem Array und Status des Neustarts
    }
    // Diese Funktion setzt den Zustand aller Fragen im Fragen-Service auf den anfangs Zustand zurück
    booleanReset(service: FragenArrayService, skipped: boolean) {
      for (let i = 0; i < service.fragenArray.length; i++) {                                 // service: FragenArrayService - Der Service, der die Fragen enthält
      service.fragenArray[i].skipped = skipped;                                              // skipped: boolean - Der Wert, auf den der übersprungen-Status aller Fragen gesetzt werden soll
        }
    }
 }
 
  

 