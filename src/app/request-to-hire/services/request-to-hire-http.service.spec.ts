import { TestBed } from '@angular/core/testing';

import { RequestToHireHttpService } from './request-to-hire-http.service';

describe('RequestToHireHttpService', () => {
  let service: RequestToHireHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
