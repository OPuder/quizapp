import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizauswahlComponent } from './quizauswahl.component';

describe('QuizauswahlComponent', () => {
  let component: QuizauswahlComponent;
  let fixture: ComponentFixture<QuizauswahlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizauswahlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizauswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
