import { TestBed } from '@angular/core/testing';

import { JobApplicationWorkingStatusService } from './ja-working-status.service';

describe('JobApplicationWorkingStatusService', () => {
  let service: JobApplicationWorkingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationWorkingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
