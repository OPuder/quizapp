import { QuizlogicService } from './../../../quizlogic.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Fragen } from '../../../fragen';

@Component({
  selector: 'app-quizauswahl',
  standalone: true,
  imports: [CommonModule,RouterLink,HttpClientModule],
  templateUrl: './quizauswahl.component.html',
  styleUrls: ['./quizauswahl.component.css']
})
export class QuizauswahlComponent {
  quizService: any;
  
  constructor(private http: HttpClient, private QuizlogicServiceService: QuizlogicService) { } 
  fragen : Fragen[] = [];

  data() {
    return this.http.get<Fragen[]>('./assets/TypeScriptMittel.json');
  }
  loadQuizMetadata(): any {
    return this.http.get<Fragen[]>('./assets/quiz-metadata.json');
  }
  // Call the data function and log the result
  ngOnInit() {
    this.data().subscribe(data => {
      console.log(data);
    });
    this.loadQuizMetadata().subscribe((loadQuizMetadata: any) => {
      console.log(loadQuizMetadata);
    });
  }
  test2 : any = this.loadQuizMetadata();
  test : any = this.data;
  test3:number =  3;
}
