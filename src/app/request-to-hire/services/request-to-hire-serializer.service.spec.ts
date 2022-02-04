import { TestBed } from '@angular/core/testing';

import { RequestToHireSerializerService } from './request-to-hire-serializer.service';

describe('RequestToHireSerializerService', () => {
  let service: RequestToHireSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
