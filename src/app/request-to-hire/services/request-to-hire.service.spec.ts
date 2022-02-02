import { TestBed } from '@angular/core/testing';

import { RequestToHireService } from './request-to-hire.service';

describe('RequestToHireService', () => {
  let service: RequestToHireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
