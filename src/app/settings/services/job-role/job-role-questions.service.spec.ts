import { TestBed } from '@angular/core/testing';

import { JobRoleQuestionsService } from './job-role-questions.service';

describe('JobRoleQuestionsService', () => {
  let service: JobRoleQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRoleQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
