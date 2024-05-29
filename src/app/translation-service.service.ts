import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fragen } from './fragen';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
translations: any = {};                                                                                             // Initialisierung auf ein leeres Objekt
currentLanguage: string = '';                                                                                  // Standardsprache auf Deutsch setzen
  
  constructor(private http: HttpClient) {                                                                           // Konstruktor
    this.loadTranslations().subscribe((data: any) => {   
      console.log('DATA', data);                                                           // Lade die Übersetzungsdaten beim Erstellen der Instanz des TranslationService
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
  getTranslation(key: string): Observable<Fragen[]> {
    return new Observable<Fragen[]>(observer => {
      if (!this.translations) {
        console.error('Übersetzungen noch nicht geladen!');
        observer.error('Übersetzungen noch nicht geladen!');
        return;
      }

      const translation = this.translations[this.currentLanguage][key];
      if (!translation) {
        console.warn(`Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);
        observer.error(`Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);
        return;
      }

      observer.next(translation);
      observer.complete();
    });
  }
}
