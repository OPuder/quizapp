import { RouterLink, RouterModule } from '@angular/router';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterModule,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'get started';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.setDocumentLanguage();
  }

  setDocumentLanguage(): void {
    // Überprüfen, ob der Code im Browser läuft
    const isBrowser = isPlatformBrowser(this.platformId);
    console.log('Ist es eine Browser-Umgebung?', isBrowser);

    if (isBrowser) {
      // Erkenne die Benutzersprache
      var userLanguage = navigator.language || (navigator as any).userLanguage || 'de';

      // Setze das lang-Attribut des html-Tags entsprechend der Benutzersprache
      document.documentElement.lang = userLanguage;

      // Ausgabe der erkannten Sprache in der Konsole
      console.log('Erkannte Sprache:', userLanguage);
      console.log('Aktuelles lang-Attribut:', document.documentElement.lang);
    } else {
      console.log('Dies ist keine Browser-Umgebung.');
    }
  }
}
