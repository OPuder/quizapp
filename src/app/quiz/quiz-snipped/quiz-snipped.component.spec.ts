import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSnippedComponent } from './quiz-snipped.component';

describe('QuizSnippedComponent', () => {
  let component: QuizSnippedComponent;
  let fixture: ComponentFixture<QuizSnippedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSnippedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizSnippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
