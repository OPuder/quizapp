import { RouterLink, RouterModule } from '@angular/router';                                                      // Import der RouterLink und RouterModule
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';                                          // Import von Component, OnInit, Inject und PLATFORM_ID aus dem Angular-Core
import { CommonModule, isPlatformBrowser } from '@angular/common';                                               // Import von CommonModule und isPlatformBrowser aus Angular
import { HttpClientModule, HttpClient} from '@angular/common/http';                                                         // Import von HttpClientModule aus Angular
import { TranslationService } from './translation-service.service'                                               // Import von TranslationService aus translation-service.service
import { LOCALE_ID } from '@angular/core';                                                                       // Import von LOCALE_ID aus Angular

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterModule,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'get started';                                                                                        // Titel der Startseite
  translations: any;                                                                                            // Variable zum Speichern der Übersetzungen
  constructor(                                                                                                  // Konstruktor
    @Inject(PLATFORM_ID) private platformId: Object,                                                            // Inject der PLATFORM_ID
    private translationService: TranslationService,                                                             // Inject der TranslationService
    private http: HttpClient,                                                                                    // Inject der HttpClient
    @Inject(LOCALE_ID) private localeId: string                                                                 // Inject der LOCALE_ID
) {}

  ngOnInit(): void {                                                                                            // Lifecycle-Funktion, die beim Laden der Komponente aufgerufen wird
    this.loadTranslations();                                                                                    // Aufruf der Methode, um die Übersetzungen zu laden
    this.setDocumentLanguage();                                                                                 // Aufruf der Methode, um die Sprache des Dokuments zu setzen
  }
  setDocumentLanguage(): void {
    const isBrowser = isPlatformBrowser(this.platformId);                                                        // Überprüfte, ob es eine Browser-Umgebung ist
    console.log('Ist es eine Browser-Umgebung?', isBrowser);                                                     // Ausgabe, ob es eine Browser-Umgebung ist

    if (isBrowser) {                                                                                              
      var userLanguage = navigator.language || (navigator as any).userLanguage || 'de-CH'                         // Erkenne die Benutzersprache 
      document.documentElement.lang = userLanguage;                                                               // Setze das lang-Attribut des html-Tags entsprechend der Benutzersprache
      this.translationService.setLanguage(this.localeId);                                                         // Aufruf der Methode, um die Sprache zu setzen
      console.log('Erkannte Sprache:', userLanguage);                                                             // Ausgabe der erkannten Sprache in der Konsole
      console.log('Aktuelles lang-Attribut:', document.documentElement.lang);                                     // Ausgabe des aktuell gesetzten lang-Attributs
    } else {
      console.log('Dies ist keine Browser-Umgebung.');                                                            // Ausgabe, wenn es keine Browser-Umgebung ist
    }
      if (this.translationService.translations) {                                                                 // Prüfen Sie, ob Übersetzungen geladen sind
      console.log('Ausgabe der ersten Übersetzung: ', this.translationService.getTranslation("qSnipped.0.frage"));// Ausgabe der ersten Übersetzung
    } else {
      console.warn(' Übersetzungen noch nicht geladen!');                                                         // Ausgabe, wenn die Übersetzungen noch nicht geladen sind
    }
  }
  private loadTranslations() {
    this.http.get('assets/translations.json')
      .subscribe(data => {
        this.translations = data;
      }, error => {
        console.error('Fehler beim Laden der Übersetzungen:', error);
      });
  }
}

