import { TestBed } from '@angular/core/testing';

import { RequestNewResolver } from './request-new.resolver';

describe('RequestNewResolver', () => {
  let resolver: RequestNewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestNewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
