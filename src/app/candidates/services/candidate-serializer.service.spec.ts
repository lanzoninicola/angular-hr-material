import { TestBed } from '@angular/core/testing';

import { CandidateSerializerService } from './candidate-serializer.service';

describe('CandidateSerializerService', () => {
  let service: CandidateSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
