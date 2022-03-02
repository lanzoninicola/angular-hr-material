import { TestBed } from '@angular/core/testing';

import { InterviewAttendeeHttpService } from './interview-attendee-http.service';

describe('InterviewAttendeeHttpService', () => {
  let service: InterviewAttendeeHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewAttendeeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
