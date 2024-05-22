import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  [x: string]: any;
  private translations: any; // Hier werden die Übersetzungen gespeichert
  

  constructor(private http: HttpClient) { }

  // Methode zum Laden der Übersetzungsdateien
  loadTranslations(): Observable<any> {
    return this.http.get('assets/translations.json');
  }

  // Methode zum Abrufen einer bestimmten Übersetzung anhand des Schlüssels
  getTranslation(key: string): string {
    // Annahme: Die bevorzugte Sprache des Benutzers wird aus den Browserspracheinstellungen abgerufen
    const userLanguage = navigator.language.split('-')[0]; // Erster Teil der Browsersprache, z.B. "en" für "en-US"
    return this.translations[key]?.[userLanguage] || '';
  }

  // Methode zum Speichern der geladenen Übersetzungsdaten
  setTranslations(translations: any): void {
    this.translations = translations;
  }
}
