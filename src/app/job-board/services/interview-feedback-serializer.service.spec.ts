import { TestBed } from '@angular/core/testing';

import { InterviewFeedbackSerializerService } from './interview-feedback-serializer.service';

describe('InterviewFeedbackSerializerService', () => {
  let service: InterviewFeedbackSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewFeedbackSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
