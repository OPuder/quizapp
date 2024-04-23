import {Routes, RouterModule} from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    {
        path: 'app-quiz',
        loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent)
     },
    
];

    export class AppRoutingModule {}