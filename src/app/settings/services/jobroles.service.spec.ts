import { TestBed } from '@angular/core/testing';

import { JobrolesService } from './jobroles.service';

describe('JobrolesService', () => {
  let service: JobrolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobrolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
