import { Injectable } from '@angular/core';                                                                         // Import der Injectable-Klasse
import { HttpClient } from '@angular/common/http';                                                                  // Import der HttpClient-Klasse
import { Observable } from 'rxjs';                                                                                  // Import der Observable-Klasse
import { Fragen } from './quiz/fragen';                                                                                  // Import der Fragen-Klasse

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
translations: any = {};                                                                                             // Initialisierung auf ein leeres Objekt
currentLanguage: string = '';                                                                                       // Standardsprache auf "leer" setzen
  
  constructor(private http: HttpClient) {                                                                           // Konstruktor
    this.loadTranslations().subscribe((data: any) => {                                                              // Lade die Übersetzungsdaten beim Erstellen der Instanz des TranslationService
     // console.log('translations DATA', data);                                                                       // Ausgabe der geladenen Übersetzungsdaten in der Konsole
      this.translations = data;                                                                                     // Hier werden die geladenen Übersetzungsdaten in die translations-Eigenschaft gespeichert
     // console.log(' Übersetzungen geladen:', this.translations);                                                    // Ausgabe der geladenen Übersetzungsdaten in der Konsole
   });
  }
  loadTranslations(): Observable<any> {                                                                             //  Lade die JSON-Datei über HTTP-Request
    return this.http.get('assets/translations.json');
  }
  setLanguage(language: string) {                                                                                   // Methode zum Setzen der Sprache
    this.currentLanguage = language;                                                                                // Setze die aktuelle Sprache
   // console.log('Sprache geändert nach dem Browser  zu:', this.currentLanguage);                                    // Ausgabe der aktuellen Sprache in der Konsole
  }
  getTranslation(key: string): Observable<Fragen[]> {                                                               // Methode zum Abrufen der Übersetzung mit eine bestimmte Schlüssel
    return new Observable<Fragen[]>(observer => {                                                                   // Erstelle ein Observable-Objekt, um die Übersetzung zu empfangen
      if (!this.translations) {                                                                                     // Prüft, ob die Übersetzungen geladen wurden
        console.error("Translation ?!? Nothing Find yet -.-'");                                                     // Fehlermeldung, wenn die Übersetzungen noch nicht geladen wurden
        return;                                                                                                     // Beende die Methode, da die Übersetzung nicht gefunden wurde
      }

      const translation = this.translations[this.currentLanguage][key];                                             // Lade die Übersetzung für die aktuelle Sprache und Schlüssel
      if (!translation) {                                                                                           // Prüft, ob die Übersetzung existiert
        console.warn(`Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);    // Warnung, wenn die Übersetzung nicht gefunden wird mit Ausgabe von den Key-Werten und Sprache
        observer.error(`Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);  // Fehler, wenn die Übersetzung nicht gefunden wird mit Ausgabe von den Key-Werten und Sprache
        return;                                                                                                     // Beende die Methode, da die Übersetzung nicht gefunden wurde
      }

      observer.next(translation);                                                                                   // Füge die Übersetzung zum Observable hinzu
      observer.complete();                                                                                          // Beende den Observer
    });
  }
}
