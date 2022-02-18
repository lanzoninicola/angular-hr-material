import { TestBed } from '@angular/core/testing';

import { CandidateStoreService } from './candidate-store.service';

describe('CandidateStoreService', () => {
  let service: CandidateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
