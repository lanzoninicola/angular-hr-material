import { TestBed } from '@angular/core/testing';

import { JobBoardSerializerService } from './job-board-serializer.service';

describe('JobBoardSerializerService', () => {
  let service: JobBoardSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobBoardSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
