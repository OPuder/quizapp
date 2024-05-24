import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
translations: any = {};                                                                                             // Initialisierung auf ein leeres Objekt
currentLanguage: string = 'de-DE';                                                                                  // Standardsprache auf Deutsch setzen
  
  constructor(private http: HttpClient) {                                                                           // Konstruktor
    this.loadTranslations().subscribe((data: any) => {                                                              // Lade die Übersetzungsdaten beim Erstellen der Instanz des TranslationService
      this.translations = data;                                                                                     // Hier werden die geladenen Übersetzungsdaten in die translations-Eigenschaft gespeichert
      console.log(' Übersetzungen geladen:', this.translations);                                                    // Ausgabe der geladenen Übersetzungsdaten in der Konsole
   });
  }
  loadTranslations(): Observable<any> {                                                                             //  Lade die JSON-Datei über HTTP-Request
    return this.http.get('assets/translations.json');
  }
  setLanguage(language: string) {                                                                                   // Methode zum Setzen der Sprache
    this.currentLanguage = language;                                                                                // Setze die aktuelle Sprache
    console.log('Sprache geändert zu:', this.currentLanguage);                                                      // Ausgabe der aktuellen Sprache in der Konsole
  }
  getTranslation(key: string): string {                                                                              // Methode zum Abrufen der Übersetzung
    if (!this.translations) {                                                                                        // Prüfen, ob die Übersetzungen geladen sind
      console.error(' Übersetzungen noch nicht geladen!');                                                           // Konsolen Ausgabe, wenn die Übersetzungen noch nicht geladen sind
      return "NOTHING LOADS HERE YET -.-'";                                                                          
    }
    const translation = this.translations[this.currentLanguage][key];                                                // Suche die Übersetzung für die angegebenen Schlüssel
    if (!translation) {
      console.warn(` Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);      // Warung wenn die Übersetzung nicht gefunden wurde
      return "NOTHING FIND HERE YET -.-'";                                                                           // Konsolen Ausgabe, wenn die Übersetzung nicht gefunden wurde
    }
    return translation;
  }
}
