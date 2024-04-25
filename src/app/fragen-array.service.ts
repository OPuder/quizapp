import { Injectable } from '@angular/core';                                                          // Import des Injectable-Dekorators aus dem Angular-Core
import { Fragen } from './fragen';                                                                   // Import der Fragen-Schnittstelle aus dem Fragen-Modul

@Injectable({                                                                                        // Dekorator, der angibt, dass die Klasse als Injectable markiert ist
  providedIn: 'root'                                                                                 // Das Injectable wird im Root-Injektor bereitgestellt, was bedeutet, dass es überall in der Anwendung verfügbar ist
})

export class FragenArrayService {                                                                    // Exportierte Klasse FragenArrayService für den Service, der Fragen verwaltet
  quizSnipped: Fragen[] = [                                                                          // Array mit Fragen-Objekten
{
  frage: "Wie deklariere ich eine Variable in JavaScript (JS)?",                                 // Die Frage als Zeichenkette
  antwort: ["let", "Get", "set", "LETT"],                                                        // Ein Array von Antwortmöglichkeiten als Zeichenketten
  correctAntwort: 0,                                                                             // Der Index der korrekten Antwort im Antwort-Array
  skip: false                                                                                    // Ein Boolean-Wert, der angibt, ob die Frage übersprungen wurde
},

{
frage: " Welche Kammer wir für ein Methode genommen?",
antwort: ["()", "{}", "[]", "keine"],
correctAntwort: 2,
skip: false
},
{
frage: "Was ist die erste Nummer in einen Array?",
antwort: ["6", "1", "10", "0"],
correctAntwort: 3,
skip: false
},
{
frage: "Sind Java und Typscript das gleiche?",
antwort: ["Nein", "Ähnlich", "Ja", "Egal"],
correctAntwort: 0,
skip: false
},
];

  fragenArray: Fragen[] = [                                                                          // Array mit Fragen-Objekten
    {
      frage: " Wie deklariere ich eine Variable in JavaScript (JS)?",                                 // Die Frage als Zeichenkette
      antwort: ["let", "Get", "set", "LETT"],                                                        // Ein Array von Antwortmöglichkeiten als Zeichenketten
      correctAntwort: 0,                                                                             // Der Index der korrekten Antwort im Antwort-Array
      skip: false                                                                                    // Ein Boolean-Wert, der angibt, ob die Frage übersprungen wurde
    },

{
    frage: " Welche Kammer wir für ein Array genommen?",
    antwort: ["()", "{}", "[]", "keine"],
    correctAntwort: 2,
    skip: false
},
{
    frage: " Was ist die erste Nummer in einen Array?",
    antwort: ["6", "1", "10", "0"],
    correctAntwort: 3,
    skip: false
},
{
    frage: " Sind Javascript und Typscript das gleiche?",
    antwort: ["Nein", "Ähnlich", "Ja", "Egal"],
    correctAntwort: 1,
    skip: false
},
];


constructor() { }
getFrage() {                                                                                         // Methode, um alle Fragen zurückzugeben
  return this.fragenArray;                                                                           // Rückgabe des Arrays mit Fragen
}

getRandomFrage(): Fragen[] {                                                                         // Zufällige Ausgabe der Fragen
  const randomFragenArray = [...this.fragenArray];                                                   // Stabile Kopie des Fragen-Arrays erstellen
  randomFragenArray.sort(() => Math.random() - 0.5);                                                 // Das Array mischen, um die Fragen in zufälliger Reihenfolge anzuzeigen
  return randomFragenArray;                                                                          // Rückgabe des gemischten und neu nummerierten Arrays
  }  

getSnippedFrage(): Fragen[] {                                                                         // Zufällige Ausgabe der Fragen                                                                         // Array mit Fragen-Objekten
  const snippedFragenArray = [...this.quizSnipped];                                                   // Stabile Kopie des Fragen-Arrays erstellen
  snippedFragenArray.sort(() => Math.random() - 0.5);                                                 // Das Array mischen, um die Fragen in zufälliger Reihenfolge anzuzeigen
  return snippedFragenArray;                                                                          // Rückgabe des gemischten und neu nummerierten Arrays
  }  
}


