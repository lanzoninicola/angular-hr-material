import { TestBed } from '@angular/core/testing';

import { RequestEditResolver } from './request-edit.resolver';

describe('RequestEditResolver', () => {
  let resolver: RequestEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RequestEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
