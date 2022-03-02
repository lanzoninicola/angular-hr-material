import { TestBed } from '@angular/core/testing';

import { InterviewAttendeeSerializerService } from './interview-attendee-serializer.service';

describe('InterviewAttendeeSerializerService', () => {
  let service: InterviewAttendeeSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewAttendeeSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
