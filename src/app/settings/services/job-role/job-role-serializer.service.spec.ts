import { TestBed } from '@angular/core/testing';

import { JobRoleSerializerService } from './job-role-serializer.service';

describe('JobRoleSerializerService', () => {
  let service: JobRoleSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRoleSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
