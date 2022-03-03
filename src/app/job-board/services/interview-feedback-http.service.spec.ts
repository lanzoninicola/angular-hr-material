import { TestBed } from '@angular/core/testing';

import { InterviewFeedbackHttpService } from './interview-feedback-http.service';

describe('InterviewFeedbackHttpService', () => {
  let service: InterviewFeedbackHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewFeedbackHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
