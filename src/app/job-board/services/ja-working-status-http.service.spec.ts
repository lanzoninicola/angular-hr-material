import { TestBed } from '@angular/core/testing';

import { JobApplicationWorkingStatusHttpService } from './ja-working-status-http.service';

describe('JobApplicationWorkingStatusHttpService', () => {
  let service: JobApplicationWorkingStatusHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationWorkingStatusHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
