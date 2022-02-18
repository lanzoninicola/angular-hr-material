import { TestBed } from '@angular/core/testing';

import { JobBoardHttpService } from './job-board-http.service';

describe('JobBoardHttpService', () => {
  let service: JobBoardHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobBoardHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
