import { TestBed } from '@angular/core/testing';

import { RequestToHireFormService } from './request-to-hire-form.service';

describe('RequestToHireFormService', () => {
  let service: RequestToHireFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
