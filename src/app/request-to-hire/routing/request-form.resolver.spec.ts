import { TestBed } from '@angular/core/testing';

import { RequestFormResolver } from './request-form.resolver';

describe('RequestFormResolver', () => {
  let resolver: RequestFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
