import { Injectable } from '@angular/core';                                                    // Import von Injectable aus dem Angular-Core für die Service-Deklaration
import { TranslationService } from '../translation-service.service';                            // Import der TranslationService
import { map } from 'rxjs/operators';                                                          // Import von map aus rxjs
import { Fragen } from './fragen';                                                             // Import der Fragen-Schnittstelle
import { testFragen } from '../../assets/TestFragen';                                             // Import von Testfragen
import { jMidd } from '../../assets/JavaScriptMittel';                                            // Import von JavaScript-Mittelstufe-Fragen
import { jEasy } from '../../assets/JavaScriptLeicht';                                            // Import von JavaScript-Leicht-Fragen
import { jHard } from '../../assets/JavaScriptSchwer';                                            // Import von JavaScript-Schwer-Fragen
import { jZufall } from '../../assets/JavaScriptZufall';                                          // Import von zufälligen JavaScript-Fragen
import { tEasy } from '../../assets/TypeScriptLeicht';                                            // Import von TypeScript-Leicht-Fragen
import { tMidd } from '../../assets/TypeScriptMittel';                                            // Import von TypeScript-Mittelstufe-Fragen
import { tHard } from '../../assets/TypeScriptSchwer';                                            // Import von TypeScript-Schwer-Fragen
import { tZufall } from '../../assets/TypeScriptZufall';                                          // Import von zufälligen TypeScript-Fragen
import { aEasy } from '../../assets/AngularLeicht';                                               // Import von Angular-Leicht-Fragen
import { aMidd } from '../../assets/AngularMittel';                                               // Import von Angular-Mittelstufe-Fragen
import { aHard } from '../../assets/AngularSchwer';                                               // Import von Angular-Schwer-Fragen
import { aZufall } from '../../assets/AngularZufall';                                             // Import von zufälligen Angular-Fragen

//import { qSnipped } from '../assets/QuizSnipped';                                            // Import des Quiz-Snippets mit Fragen
@Injectable({                                                                                  // Injectable-Klasse
  providedIn: 'root'                                                                           // Das QuizlogicService wird als Singleton-Service im Root-Injector registriert
})
export class QuizlogicService {                                                                // QuizlogicService-Klasse
  zufälligeFragen15: Fragen[] = [];                                                            // Array für die zufügen15 Fragen
  zufallsFragen: Fragen[] = [];                                                                // Array für die zufälligen Fragen
  Fragen: Fragen[] = [];                                                                       // Array für die Fragen
  unbeantworteteFragen: Fragen[] = [];                                                         // Array für die unbeantworteten Fragen
  quizAbgeschlossen: boolean = false;                                                          // Flag, um den Abschluss des Quiz zu verfolgen
  skipRunde: boolean = false;                                                                  // Flag, um zu verfolgen, ob sich das Quiz in einer "Skip-Runde" befindet
  selectedCase: number = 0;                                                                    // Variable zur Speicherung des ausgewählten Falls für das Quiz
  punktzahl: number = 0;                                                                       // Variable zur Speicherung der Punktzahl
  aktuelleFrageIndex: number = 0;                                                              // Index der aktuellen Frage im Fragen-Array
  skipFragenIndex: number = 0;                                                                 // Index der übersprungenen Frage im unbeantworteten Fragen-Array
  antwortIndex: number = 0;                                                                    // Index der ausgewählten Antwort
  aktuelleAntwort: string[] = [];                                                              // Array für die aktuelle Antwortmöglichkeiten
  skipAntwort: string[] = [];                                                                  // Array für die übersprungene Antwortmöglichkeiten
  aktuelleFrage: string = "";                                                                  // Variable für die aktuelle Frage
  skipFrage: string = "";                                                                      // Variable für die übersprungene Frage

  constructor(private translationService: TranslationService) { }                              // constructor der Klasse QuizlogicService
  toggleQuiz(selectedCase: number) {                                                           // Methode zum Starten des Quizzes
    let selectedArray: Fragen[];                                                               // Deklaration einer lokalen Variablen für das ausgewählte Array von Fragen
  
    switch(selectedCase) {                                                                     // Verwendung eines switch-Statements, um das entsprechende Array von Fragen basierend auf dem ausgewählten Fall auszuwählen
      case 15:                                                                                 // Fall 15:Quiz Snipped Fragenarray
        this.translationService.getTranslation('qSnipped').pipe(                               // Verwendung der getTranslation-Methode, um die entsprechende Übersetzung zu laden mit den key "qSnipped"
          map((fragen: Fragen[]) => {                                                          // Verwendung der map-Methode, um das Observable zu transformieren
            selectedArray = fragen ?? [];                                                      // Setze das ausgewählte Array auf das fragen-Array oder auf ein leeres Array,falls fragen null oder undefiniert ist.
            console.log('original Array nicht gemischt', selectedArray);                       // Konsolenausgabe des ausgewählten Arrays
            const zufallsFragen = [...selectedArray];                                          // Das Spread-Operator (...) wird verwendet, um ein neues Array zu erstellen,das alle Elemente von selectedArray enthält.
            this.zufallsFragen = zufallsFragen;                                                // Setze das ausgewählte Array auf das zufallsFragen-Array
          })
         ).subscribe(                                                                          // Abonniere das Observable und lade die Übersetzungen
          () => {},                                                                            // Leerer Erfolgs-Callback, kann optional für weitere Aktionen verwendet werden
          error => console.error('Fehler beim Laden der Übersetzungen:', error)                // Konsolenausgabe des Fehlers
        );
        break;
      case 0:
        selectedArray = testFragen;                                                            // Setze das ausgewählte Array auf das Test-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 1:
        selectedArray = jEasy;                                                                 // Setze das ausgewählte Array auf das Leichte JavaScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 2:
        selectedArray = jMidd;                                                                 // Setze das ausgewählte Array auf das Mittlere JavaScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 3:
        selectedArray = jHard;                                                                 // Setze das ausgewählte Array auf das Schwere JavaScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 4:
        selectedArray = jZufall;                                                               // Setze das ausgewählte Array auf ein Zufällig gemischtes JavaScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 5:
        selectedArray = tEasy;                                                                 // Setze das ausgewählte Array auf das Leichte TypeScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 6:
        selectedArray = tMidd;                                                                 // Setze das ausgewählte Array auf das Mittlere TypeScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 7:
        selectedArray = tHard;                                                                 // Setze das ausgewählte Array auf das Schwere TypeScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 8:
        selectedArray = tZufall;                                                               // Setze das ausgewählte Array auf ein Zufällig gemischtes TypeScript-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 9:
        selectedArray = aEasy;                                                                 // Setze das ausgewählte Array auf das Leichte Angular-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 10:
        selectedArray = aMidd;                                                                 // Setze das ausgewählte Array auf das Mittlere Angular-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 11:
        selectedArray = aHard;                                                                 // Setze das ausgewählte Array auf das Schwere Angular-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      case 12:
        selectedArray = aZufall;                                                               // Setze das ausgewählte Array auf ein Zufällig gemischtes Angular-Array
        console.log('original Array nicht gemischt', selectedArray);                           // Konsolenausgabe des ausgewählten Arrays
        break;
      default:
        throw new Error('Ungültiger Fall ausgewählt');                                         // Fehlermeldung für den Fall, dass ein ungültiger Fall ausgewählt wurde
    }

    this.zufallsFragen.sort(() => Math.random() - 0.5);                                        // Mische die Fragen im Array zufällig
    const zufälligeFragen15 = this.zufallsFragen.slice(0, 15);                                 // Wähle die ersten 15 Fragen aus dem gemischten Array aus
    console.log('Alle Gemischte Fragen aus den Origninal',this.zufallsFragen);                 // Konsolenausgabe des gemischten Arrays 
    console.log('Ausgewählten 15 Fragen', zufälligeFragen15);                                  // Konsolenausgabe der ersten 15 Fragen aus dem gemischten Array
    this.Fragen = zufälligeFragen15;                                                           // Zuweisung des gemischten Arrays zu den Fragen
   

    console.log('Übersetztes Array',this.Fragen);                                              // Konsolenausgabe der Fragenliste 
  } 
  initializeQuiz() {                                                                           // Methode zum Initialisieren des Quizzes
    this.aktuelleFrageIndex = 0;                                                               // Setze den Index der aktuellen Frage auf 0
    this.skipFragenIndex = 0;                                                                  // Setze den Index der übersprungenen Fragen auf 0
    this.punktzahl = 0;                                                                        // Setze die Punktzahl auf 0
    this.quizAbgeschlossen = false;                                                            // Setze den Quizstatus auf nicht abgeschlossen
    this.skipRunde = false;                                                                    // Setze den Status der Übersprung-Runde auf false
    this.unbeantworteteFragen = [];                                                            // Setze die Liste der unbeantworteten Fragen auf ein leeres Array
    this.ladeFrage();                                                                          // Lade die erste Frage
   // console.log(this.initializeQuiz);                                                        // Konsolenausgabe zur Verifizierung, dass die Methode aufgerufen wurde
    console.log('Fragen die im Quiz Angezeigt werden',this.Fragen);                            // Konsolenausgabe des aktuellen Zustands der Fragenliste
  }
  ladeFrage() {                                                                                // Methode zum Laden der Fragen
    try {
    if (this.Fragen.length > this.aktuelleFrageIndex) {                                        // Überprüft ob alle Fragen durchgelaufen sind
        this.aktuelleFrage = this.Fragen[this.aktuelleFrageIndex].frage;                       // Setzen der aktuellen Frage
        this.aktuelleAntwort = this.Fragen[this.aktuelleFrageIndex].antwort;                   // Setzen der Antwortmöglichkeiten
      }
      if (this.aktuelleFrageIndex === this.Fragen.length) {                                    // Überprüft, ob alle Fragen einmal angezeigt wurden
        if (this.unbeantworteteFragen.length === this.skipFragenIndex) {                       // Überprüft ob es skipped Fragen gibt
          this.quizAbgeschlossen = true;                                                       // Setzt Den Quiz abschluss auf true um das Ergebniss anzuzeigen
        } else {
          this.skipRunde = true;                                                               // Setzt den Status der Übersprung-Runde auf true
          this.skipFragen();                                                                   // Ruft die Funktion für die übersprungenden Fragen auf 
        }
      }
    }catch (error) {
      console.error('Fehler beim Laden der Fragen:',this.Fragen, error);                       // Fehlerbehandlung, falls das Laden der Fragen fehlschlägt
    }
  }
  fragenNummer(): number | string {                                                            // Methode zum Abrufen der aktuellen Fragennummer
    try {
      const gesamtanzahlFragen = this.Fragen.length;                                           // Gesamnteanzahl an Fragen (Fragen + skip Fragen)
      const aktuelleFragennummer = this.aktuelleFrageIndex + 1;                                // aktuelle Fragennummer +1,weil das Array bei 0 startet
      if (aktuelleFragennummer <= gesamtanzahlFragen) {                                        // Überprüfe, ob die aktuelle Fragennummer innerhalb des gültigen Bereichs liegt
        return "Frage:" + aktuelleFragennummer;                                                // Rückgabe der aktuellen Fragenummer
      } else {
        return "Übersprungende Fragen";                                                        // Rückgabe eines strings mit dem Inhalt "Übersprungenden Frage" anstatt der aktuellen Fragennummer
      }
    }catch (error) {
      console.error('Ungültige aktuelle Fragennummer:',);                                      // Zeigt eine Fehlermeldung in der Konsole an, wenn die aktuelle Fragennummer ungültig ist
      return -1;
    }
  }
  pruefeAntwort(antwortIndex: number) {                                                        // Methode zum Prüfen der Antwort
    try {
      this.antwortIndex = antwortIndex;                                                        // Setzen des ausgewählten Antwortindex
      if (this.Fragen.length > this.aktuelleFrageIndex) {                                      // Überprüft ob alle Fragen durchgelaufen sind
        if (this.Fragen[this.aktuelleFrageIndex].correctAntwort === antwortIndex) {            // Überprüft die Antwort mit der Hinterlegten im Array
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.aktuelleFrageIndex++;                                                              // Inkrementieren des FrageIndex für die nächste Frage
        this.ladeFrage();                                                                       // ruft die Funktion ladeFrage auf um die naechste Frage anzuzeigen
      }
      else {                                                                                   // Überprüfen der Antwort für übersprungene Fragen
        if (this.unbeantworteteFragen[this.skipFragenIndex].correctAntwort === antwortIndex) { // Überprüft die Antwort mit der Hinterlegten im Array 
          this.punktzahl++;                                                                    // Erhöhen der Punktzahl bei richtiger Antwort
        }
        this.skipFragenIndex++;                                                                // Inkrementieren des skipFrageIndex für die nächste Frage
        this.skipFragen();                                                                     // Aufrufen der Funktion skippedFragen, um die nächste übersprungene Frage anzuzeigen
      }
    }catch (error) {
      console.error('Fehler bei der Auswahl der Antworten', error);                            // Fängt Fehler ab und gibt sie in der Konsole aus
    }
  }
  nextFrage() {                                                                                // Methode zum Überspringen der aktuellen Frage
    try {
      if (!this.Fragen[this.aktuelleFrageIndex].uebersprungen) {                                        // Überprüfen, ob die aktuelle Frage bereits übersprungen wurde
        this.Fragen[this.aktuelleFrageIndex].uebersprungen = true;                                      // Falls nicht, markiere die Frage als übersprungen (skipped auf true setzen)
        this.unbeantworteteFragen.push(this.Fragen[this.aktuelleFrageIndex]);                  // Füge die Frage zur Liste der nicht beantworteten Fragen hinzu
        console.log("Skip Fragen Array", this.unbeantworteteFragen);                           // Zeige die Liste der nicht beantworteten Fragen in der Konsole an
      }
      if (this.aktuelleFrageIndex < this.Fragen.length) {                                      // Überprüfen, ob es noch weitere Fragen gibt, und ggf. zur nächsten Frage wechseln 
        this.aktuelleFrageIndex++;                                                             // Falls ja, erhöhe den Index auf die nächste Frage
        this.ladeFrage();                                                                      // Zeige die nächste Frage an
      }
    } catch (error) {
      console.error('Fehler beim Anzeigen der nächsten Frage:', error);                        // Fängt Fehler ab und gibt sie in der Konsole aus
      console.log("Frage wurde schon einmal übersprungen");                                    // Fehlermeldung im Consolen Log
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
    }catch (error) {
      console.error('Fehler beim Anzeigen der übersprungenen Fragen:', error);                 // Fängt Fehler ab und gibt sie in der Konsole aus
    }
  }
  neustart() {                                                                                 // Methode zum Neustarten des Quiz-
    this.Fragen.forEach((frage: Fragen) => {                                                   // Schleife durch alle Fragen des Arrays
      frage.uebersprungen = false;                                                             // Setze alle Fragen auf nicht Übersprungen
    });                                                                                            
    this.skipRunde = false;                                                                    // Setze skipRunde auf false, um den Button "naechste Frage" zu aktivieren
    this.quizAbgeschlossen = false;                                                            // Setzen des Quizstatus auf nicht abgeschlossen
    this.unbeantworteteFragen = [];                                                            // Setze die Liste der nicht beantworteten Fragen auf eine leere Liste
    this.aktuelleFrageIndex = 0;                                                               // Zurücksetzen des Frageindex
    this.skipFragenIndex = 0;                                                                  // Zurücksetzen der skipFragenIndex
    this.punktzahl = 0;                                                                        // Zurücksetzen der Punktzahl
    this.Fragen = this.Fragen.sort(() => Math.random() - 0.5);                                 // Neuladen der Fragen in zufallige Reihenfolge
    this.ladeFrage();                                                                          // Laden der Fragen für einen Neustart
    console.log("Neustart des Quiz",'unbeanrtete Fragen->', this.unbeantworteteFragen,
    "Punktzahl->", this.punktzahl,"die fragen aus dem quiz",this.Fragen)                       // Ausgabe der Fragen und der nicht beantworteten Fragen in der Konsole
  }
}