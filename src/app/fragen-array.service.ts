import { Injectable } from '@angular/core';
import { Fragen } from './fragen';

@Injectable({
  providedIn: 'root'
})
export class FragenArrayService {
  [x: string]: any;
  fragenArray: Fragen[] = [
    {
      question: "Wie deklariere ich eine Variable in JavaScript (JS)?",     // Die Frage als String
      answers: ["let", "Get", "set", "LETT"],                               // Die Antworten als Array
      correctAnswer: 0,                                                     // Die richtige Antwort aus dem Antwortarray als Zahl (number)
      skipped: false                                                        // Die Abfrage ob diese Frage schon Übersprungen wurde Boolean 
    },                                                                      //            (kann nur true (Wahr) oder false (Falsch) sein )
    {
      question: "Wie erstelle ich eine Funktion in JavaScript?",
      answers: ["function()", "func()", "createFunction()", "functionName()"],
      correctAnswer: 0,
      skipped: false
    },
    {
      question: "Wie verhindere ich, dass eine Funktion Werte zurückgibt?",
      answers: ["return;", "void;", "null;", "stopReturn;"],
      correctAnswer: 1,
      skipped: false
    },
    {
      question: "Welcher Operator wird verwendet, um Gleichheit in JavaScript zu prüfen?",
      answers: ["==", "===", "=", "!="],
      correctAnswer: 1,
      skipped: false
    }
  ];



  getFrageByPosition(position: number): Fragen {                            // Methode, um eine einzelne Frage aus dem Array zurückzugeben
    return this.fragenArray[position];                                      //        Position === Index
  }
  
  getFragen(): Fragen[] {                                                   // Die Reihnfolge wie im Originalen Array
    return this.fragenArray;
  }

 getRandomFragen(): Fragen[] {                                              // Zufällige Ausgabe der Fragen
    const randomFragenArray = [...this.fragenArray];                        // Stabile Kopie des Fragen-Arrays erstellen
    randomFragenArray.sort(() => Math.random() - 0.5);                      // Das Array mischen, um die Fragen in zufälliger Reihenfolge anzuzeigen
    return randomFragenArray;                                               // Rückgabe des gemischten und neu nummerierten Arrays
  }
}
