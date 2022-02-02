import { TestBed } from '@angular/core/testing';

import { RequestToHireStoreService } from './request-to-hire-store.service';

describe('RequestToHireStoreService', () => {
  let service: RequestToHireStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
