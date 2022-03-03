import { TestBed } from '@angular/core/testing';

import { InterviewRoundSerializerService } from './interview-round-serializer.service';

describe('InterviewRoundSerializerService', () => {
  let service: InterviewRoundSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewRoundSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
