import { TestBed } from '@angular/core/testing';

import { CandidatesStoreService } from './candidates-store.service';

describe('CandidatesStoreService', () => {
  let service: CandidatesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
