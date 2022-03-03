import { TestBed } from '@angular/core/testing';

import { InterviewRoundHttpService } from './interview-round-http.service';

describe('InterviewRoundHttpService', () => {
  let service: InterviewRoundHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewRoundHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
