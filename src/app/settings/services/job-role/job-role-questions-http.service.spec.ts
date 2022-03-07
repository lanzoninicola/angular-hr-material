import { TestBed } from '@angular/core/testing';

import { JobRoleQuestionsHttpService } from './job-role-questions-http.service';

describe('JobRoleQuestionsHttpService', () => {
  let service: JobRoleQuestionsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRoleQuestionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
