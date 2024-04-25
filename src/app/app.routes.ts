import { JavaScriptStartseiteComponent } from './main/quizwahl/java-script-startseite/java-script-startseite.component';
import {Routes, RouterModule} from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app-startseite',
        pathMatch: 'full'
    },
    {
        path: 'app-root',
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
    },
    {
        path: 'app-startseite',
        loadComponent: () => import('./main/startseite/startseite.component').then(m => m.StartseiteComponent),
    },
    {
        path: 'app-quiz',
        loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent)
    },
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
    },
    {
        path: 'app-login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    },
];

    export class AppRoutingModule {}