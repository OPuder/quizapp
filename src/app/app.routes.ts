import { JavaScriptStartseiteComponent } from './java-script-startseite/java-script-startseite.component';
import {Routes, RouterModule} from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {
        path: 'app-quiz',
        loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent)
     },
     {

        path: 'app-java-startseite',
        loadComponent: () => import('./java-script-startseite/java-script-startseite.component').then(m => m.JavaScriptStartseiteComponent)
     },
     {
        path: 'app-root',
        loadComponent: () => import('./app.component').then(m => m.AppComponent),
    },
    {
        path: 'app-startseite',
        loadComponent: () => import('./startseite/startseite.component').then(m => m.StartseiteComponent),
    }
];

    export class AppRoutingModule {}