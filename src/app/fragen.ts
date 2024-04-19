export interface Fragen {
    question: string;       // Die Frage selbst
    answers: string[];      // Array von Antwortmöglichkeiten
    correctAnswer: number;  // Index der korrekten Antwort
    skipped: boolean;       // Boolean, ob die Frage übersprungen wurde
  }
