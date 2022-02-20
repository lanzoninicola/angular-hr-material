import { TestBed } from '@angular/core/testing';

import { JobApplicationWorkingStatusSerializerService } from './ja-working-status-serializer.service';

describe('JobApplicationWorkingStatusSerializerService', () => {
  let service: JobApplicationWorkingStatusSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationWorkingStatusSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
