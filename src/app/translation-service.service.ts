// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class TranslationService {
//   private translations: any;                                                                            // Hier werden die geladenen Übersetzungsdaten gespeichert
//   private currentLanguage: string = 'en-US';                                                               // Hier wird die aktuelle Sprache gespeichert defaultwert ist Deutsch
 
//   constructor(private http: HttpClient) {
//     this.loadTranslations().subscribe((data: any) => {                                                  // Lade die Übersetzungsdaten beim Erstellen der Instanz des TranslationService
//       this.translations = data;                                                                         // Hier werden die geladenen Übersetzungsdaten in die translations-Eigenschaft gespeichert
//     console.log('Laden der Translations Datei:',this.translations);                                     // Ausgabe der geladenen Datei in der Konsole
//     });
//   }
//   private loadTranslations(): Observable<any> {                                                         // Lade die Übersetzungsdaten über HTTP-Request
//     return this.http.get('assets/translations.json');
//   }
//   setLanguage(language: string) {                                                                       // Methode zum Setzen der Sprache
//     this.currentLanguage = language;                                                                    // Setze die aktuelle Sprache
//     console.log('Sprache geändert zu:', this.currentLanguage);                                          // Ausgabe der aktuellen Sprache in der Konsole
//   }
//   getTranslation(key: string): string {                                                                 // Methode zum Abrufen einer bestimmten Übersetzung anhand des Schlüssels
//       console.log("Übersetzung nicht gefunden oder Übersetzungsdaten nicht geladen. Nothing -.-'");
//       return this.translations.getTranslation(key);
//       }
//     }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};                                                     // Initialisierung auf ein leeres Objekt
  private currentLanguage: string = 'de';                                          // Standardsprache auf Deutsch setzen
  
  constructor(private http: HttpClient) {
    this.loadTranslations().subscribe((data: any) => {
      this.translations = data;
      console.log(' Übersetzungen geladen:', this.translations);
    });
  }
  private loadTranslations(): Observable<any> {
    return this.http.get('assets/translations.json');
  }
  setLanguage(language: string) {
    this.currentLanguage = language;
    console.log('Sprache geändert zu:', this.currentLanguage);
  }
  getTranslation(key: string): string {
    if (!this.translations) {
      console.error(' Übersetzungen noch nicht geladen!');
      return ''; // Oder einen Standardwert
    }
    const translation = this.translations[this.currentLanguage][key];
    if (!translation) {
      console.warn(` Übersetzung für Schlüssel '${key}' in Sprache '${this.currentLanguage}' nicht gefunden.`);
      return ''; // Oder einen Standardwert
    }
    return translation;
  }
}
