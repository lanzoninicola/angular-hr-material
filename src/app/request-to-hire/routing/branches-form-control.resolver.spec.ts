import { TestBed } from '@angular/core/testing';

import { BranchesFormControlResolver } from './branches-form-control.resolver';

describe('BranchesFormControlResolver', () => {
  let resolver: BranchesFormControlResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BranchesFormControlResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
