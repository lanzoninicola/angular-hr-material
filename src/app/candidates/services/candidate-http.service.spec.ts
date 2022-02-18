import { TestBed } from '@angular/core/testing';

import { CandidateHttpService } from './candidate-http.service';

describe('CandidateHttpService', () => {
  let service: CandidateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
