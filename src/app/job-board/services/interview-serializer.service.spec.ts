import { TestBed } from '@angular/core/testing';

import { InterviewSerializerService } from './interview-serializer.service';

describe('InterviewSerializerService', () => {
  let service: InterviewSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
