import { Routes } from '@angular/router';                                                 // Import der Angular-Routing-Klasse
import { authGuard } from './login/authGuard/auth.guard';

// Definition der Routing-Konfiguration für die Angular-Anwendung
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app-startseite',                                                    // Weiterleitung zur Startseite, wenn keine spezifische Route angegeben ist
        pathMatch: 'full'
    },
    {
        path: 'app-root',                                                                // Routenkonfiguration für die Root-Komponente der Anwendung
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
    },
    {
        path: 'app-startseite',                                                          // Routenkonfiguration für die Startseite-Komponente      
        loadComponent: () => import('./main/startseite/startseite.component').then(m => m.StartseiteComponent),
    },
    {
        path: 'app-quiz',                                                                // Routenkonfiguration für die Quiz-Komponente
        loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent)
    },
  //                                                                                    // Weitere Routenkonfigurationen für verschiedene Seiten der Anwendung...
    {
        path: 'app-wissenwertes',
        loadComponent: () => import('./main/wissenwertes/wissenwertes.component').then(m => m.WissenwertesComponent),
    },
    {
        path: 'app-java-script-startseite',
        loadComponent: () => import('./main/quizwahl/java-script-startseite/java-script-startseite.component').then(m => m.JavaScriptStartseiteComponent)
    },
    {
        path: 'app-type-script-startseite',
        loadComponent: () => import('./main/quizwahl/type-script-startseite/type-script-startseite.component').then(m => m.TypeScriptStartseiteComponent),
    },
    {
        path: 'app-angular-startseite',
        loadComponent: () => import('./main/quizwahl/angular-startseite/angular-startseite.component').then(m => m.AngularStartseiteComponent),
    },
    {
        path: 'app-kontakt',
        loadComponent: () => import('./main/kontakt/kontakt.component').then(m => m.KontaktComponent),
    },
    {
        path: 'app-score-board',
        loadComponent: () => import('./main/score-board/score-board.component').then(m => m.ScoreBoardComponent),
        canActivate: [authGuard]                                                          // Verwendung der AuthGuard-Klasse
    },
    {
        path: 'app-login',
        loadComponent: () => import('./login/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'app-quizauswahl',
        loadComponent: () => import('./main/quizwahl/quizauswahl/quizauswahl.component').then(m => m.QuizauswahlComponent),
    },
];
export class AppRoutingModule {}                                                          // Definition der AppRoutingModule-Klasse
