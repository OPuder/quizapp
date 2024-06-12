import { TestBed } from '@angular/core/testing';

import { QuizlogicService } from './quizlogic.service';

describe('QuizlogicService', () => {
  let service: QuizlogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizlogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
