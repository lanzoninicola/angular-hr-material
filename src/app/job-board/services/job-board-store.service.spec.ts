import { TestBed } from '@angular/core/testing';

import { JobBoardStoreService } from './job-board-store.service';

describe('JobBoardStoreService', () => {
  let service: JobBoardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobBoardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
