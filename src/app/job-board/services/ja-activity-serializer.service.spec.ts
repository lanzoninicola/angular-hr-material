import { TestBed } from '@angular/core/testing';

import { JaActivitySerializerService } from './ja-activity-serializer.service';

describe('JaActivitySerializerService', () => {
  let service: JaActivitySerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaActivitySerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
