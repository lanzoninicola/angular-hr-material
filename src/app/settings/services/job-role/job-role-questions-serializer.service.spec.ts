import { TestBed } from '@angular/core/testing';

import { JobRoleQuestionsSerializerService } from './job-role-questions-serializer.service';

describe('JobRoleQuestionsSerializerService', () => {
  let service: JobRoleQuestionsSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobRoleQuestionsSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
