import { Injectable } from '@angular/core';
import { Fragen } from './fragen';
import { FragenArrayService } from './fragen-array.service';
import { aHard } from '../assets/AngularSchwer'

@Injectable({
  providedIn: 'root'
})
export class QuizlogicService {

  Fragen: Fragen[] = [];
  unbeantworteteFragen: Fragen[] = [];
  quizAbgeschlossen: boolean = false;
  skipRunde: boolean = false;
  punktzahl: number = 0;
  aktuelleFrageIndex: number = 0;
  skipFragenIndex: number = 0;
  antwortIndex: number = 0;
  aktuelleAntwort: string[] = [];
  skipAntwort: string[] = [];
  aktuelleFrage: string = "";
  skipFrage: string = "";
  fragenArrayService: any;

  constructor(private FragenArrayService: FragenArrayService) {
     this.Fragen = FragenArrayService.getRandomFrage();

  }

  initializeQuiz() {
    this.aktuelleFrageIndex = 0;
    this.skipFragenIndex = 0;
    this.punktzahl = 0;
    this.quizAbgeschlossen = false;
    this.skipRunde = false;
    this.unbeantworteteFragen = [];
    this.ladeFrage();
    console.log(this.initializeQuiz);
  }

  ladeFrage() {                                                                                // Methode zum Laden der Fragen
    try {
      //this.Fragen = this.fragenArrayService.getFrage();                                  // Abrufen der Fragen vom Service über die getFragen() 
      if (this.Fragen.length > this.aktuelleFrageIndex) {                                      // Überprüft ob alle Fragen durchgelaufen sind
        this.aktuelleFrage = this.Fragen[this.aktuelleFrageIndex].frage;                       // Setzen der aktuellen Frage
        this.aktuelleAntwort = this.Fragen[this.aktuelleFrageIndex].antwort;                   // Setzen der Antwortmöglichkeiten
      }
      if (this.aktuelleFrageIndex === this.Fragen.length) {                                     // Überprüft, ob alle Fragen einmal angezeigt wurden
        if (this.unbeantworteteFragen.length === this.skipFragenIndex) {                        // Überprüft ob es skipped Fragen gibt
          this.quizAbgeschlossen = true;                                                       // Setzt Den Quiz abschluss auf true um das Ergebniss anzuzeigen
        } else {
          this.skipFragen();                                                                   // Ruft die Funktion für die übersprungenden Fragen auf 
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Fragen:', error);                               // Fehlerbehandlung, falls das Laden der Fragen fehlschlägt
    }
  }
  fragenNummer(): number | string {                                                                     // Methode zum Abrufen der aktuellen Fragennummer
    try {
      const gesamtanzahlFragen = this.Fragen.length;                                          // Gesamnteanzahl an Fragen (Fragen + skip Fragen)
      const aktuelleFragennummer = this.aktuelleFrageIndex + 1;                                  // aktuelle Fragennummer +1,weil das Array bei 0 startet
      if (aktuelleFragennummer <= gesamtanzahlFragen) {                                      // Überprüfe, ob die aktuelle Fragennummer innerhalb des gültigen Bereichs liegt
        return "Frage:" + aktuelleFragennummer;                                                             // Rückgabe der aktuellen Fragenummer
      } else {
        return "Übersprungende Fragen";      //                                                                     // Rückgabe einer ungültigen Nummer, um anzuzeigen, dass ein Fehler aufgetreten ist
      }
    } catch (error) {
      console.error('Ungültige aktuelle Fragennummer:',);                 // Zeigt eine Fehlermeldung in der Konsole an, wenn die aktuelle Fragennummer ungültig ist
      return -1;
    }
  }
  pruefeAntwort(antwortIndex: number) {                                                        // Methode zum Prüfen der Antwort
    try {
      this.antwortIndex = antwortIndex;                                                        // Setzen des ausgewählten Antwortindex
      if (this.Fragen.length > this.aktuelleFrageIndex) {                                       // Überprüft ob alle Fragen durchgelaufen sind
        if (this.Fragen[this.aktuelleFrageIndex].correctAntwort === antwortIndex) {            // Überprüft die Antwort mit der Hinterlegten im Array
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.aktuelleFrageIndex++;                                                              // Inkrementieren des FrageIndex für die nächste Frage
        this.ladeFrage();                                                                        // ruft die Funktion ladeFrage auf um die naechste Frage anzuzeigen
      }
      else {                                                                                   // Überprüfen der Antwort für übersprungene Fragen
        if (this.unbeantworteteFragen[this.skipFragenIndex].correctAntwort === antwortIndex) { // Überprüft die Antwort mit der Hinterlegten im Array 
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.skipFragenIndex++;                                                                // Inkrementieren des skipFrageIndex für die nächste Frage
        this.skipFragen();                                                                     // Aufrufen der Funktion skippedFragen, um die nächste übersprungene Frage anzuzeigen
      }
    } catch (error) {
      console.error('Fehler bei der Auswahl der Antworten', error);                          // Fängt Fehler ab und gibt sie in der Konsole aus
    }
  }
  nextFrage() {                                                                            // Methode zum Überspringen der aktuellen Frage
    try {
      if (!this.Fragen[this.aktuelleFrageIndex].skip) {                                        // Überprüfen, ob die aktuelle Frage bereits übersprungen wurde
        this.Fragen[this.aktuelleFrageIndex].skip = true;                                      // Falls nicht, markiere die Frage als übersprungen (skipped auf true setzen)
        this.unbeantworteteFragen.push(this.Fragen[this.aktuelleFrageIndex]);                  // Füge die Frage zur Liste der nicht beantworteten Fragen hinzu
        console.log("Skip Fragen Array", this.unbeantworteteFragen);                           // Zeige die Liste der nicht beantworteten Fragen in der Konsole an
      }
      if (this.aktuelleFrageIndex < this.Fragen.length) {                                      // Überprüfen, ob es noch weitere Fragen gibt, und ggf. zur nächsten Frage wechseln 
        this.aktuelleFrageIndex++;                                                             // Falls ja, erhöhe den Index auf die nächste Frage
        this.ladeFrage();                                                                      // Zeige die nächste Frage an
      }
    } catch (error) {
      console.error('Fehler beim Anzeigen der nächsten Frage:', error);                        // Fängt Fehler ab und gibt sie in der Konsole aus
      console.log("Frage wurde schon einmal übersprungen");                                   // Fehlermeldung im Consolen Log
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