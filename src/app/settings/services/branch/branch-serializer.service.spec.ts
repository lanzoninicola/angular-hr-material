import { TestBed } from '@angular/core/testing';

import { BranchSerializerService } from './branch-serializer.service';

describe('BranchSerializerService', () => {
  let service: BranchSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
