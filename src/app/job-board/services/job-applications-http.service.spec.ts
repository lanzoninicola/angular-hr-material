import { TestBed } from '@angular/core/testing';

import { JobApplicationsHttpService } from './job-applications-http.service';

describe('JobApplicationsHttpService', () => {
  let service: JobApplicationsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
