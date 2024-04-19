import { TestBed } from '@angular/core/testing';

import { FragenArrayService } from './fragen-array.service';

describe('FragenArrayService', () => {
  let service: FragenArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragenArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
