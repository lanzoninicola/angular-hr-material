import { TestBed } from '@angular/core/testing';

import { InterviewAttendeeService } from './interview-attendee.service';

describe('InterviewAttendeeService', () => {
  let service: InterviewAttendeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewAttendeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
