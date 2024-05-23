import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translations: any; // Hier werden die Übersetzungen gespeichert
  platformId!: Object;
  

  constructor(private http: HttpClient) { }

  // Methode zum Laden der Übersetzungsdateien
  loadTranslations(): Observable<any> {
    return this.http.get('assets/translations.json');
  }

  // Methode zum Abrufen einer bestimmten Übersetzung anhand des Schlüssels
  getTranslation(key: string): string {
    const userLanguage = isPlatformBrowser(this.platformId) ? navigator.language.split('-')[0] : 'de';
    const [category, index, property] = key.split('.');
  
    if (this.translations && this.translations[category] && this.translations[category][index]) {
      const translation = this.translations[category][index][property];
      return translation?.[userLanguage] || '';
    }
  
    return "Übersetzung nicht gefunden oder Übersetzungsdaten nicht geladen. Nothing -.-'";
  }
  // Methode zum Speichern der geladenen Übersetzungsdaten
  setTranslations(translations: any): void {
    this.translations = translations;
  }
}
