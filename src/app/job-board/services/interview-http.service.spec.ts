import { TestBed } from '@angular/core/testing';

import { InterviewHttpService } from './interview-http.service';

describe('InterviewHttpService', () => {
  let service: InterviewHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
