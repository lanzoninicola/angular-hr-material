import { TestBed } from '@angular/core/testing';

import { DateSerializerService } from './date-serializer.service';

describe('DateSerializerService', () => {
  let service: DateSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
