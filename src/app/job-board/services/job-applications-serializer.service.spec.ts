import { TestBed } from '@angular/core/testing';

import { JobApplicationsSerializerService } from './job-applications-serializer.service';

describe('JobApplicationsSerializerService', () => {
  let service: JobApplicationsSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationsSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
