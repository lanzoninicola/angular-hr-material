import { TestBed } from '@angular/core/testing';

import { PicklistHttpService } from './picklist-http.service';

describe('PicklistHttpService', () => {
  let service: PicklistHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicklistHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
