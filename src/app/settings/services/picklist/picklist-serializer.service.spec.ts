import { TestBed } from '@angular/core/testing';

import { PicklistSerializerService } from './picklist-serializer.service';

describe('PicklistSerializerService', () => {
  let service: PicklistSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicklistSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
