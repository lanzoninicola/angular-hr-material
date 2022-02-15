import { TestBed } from '@angular/core/testing';

import { JobRoleHttpService } from './job-role-http.service';

describe('JobRoleHttpService', () => {
  let service: JobRoleHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRoleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
