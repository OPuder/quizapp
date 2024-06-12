export interface Fragen {              // Exportierte Schnittstelle Fragen für die Frage-Objekte
  frage: string;                       // Die Frage selbst als Zeichenkette
  antwort: string[];                   // Ein Array von Antwortmöglichkeiten als Zeichenketten
  correctAntwort: number;              // Der Index der korrekten Antwort im Antwort-Array
  uebersprungen: boolean;                       // Ein Boolean-Wert, der angibt, ob die Frage übersprungen wurde
}

