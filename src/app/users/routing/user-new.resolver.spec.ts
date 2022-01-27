import { TestBed } from '@angular/core/testing';

import { UserNewResolver } from './user-new.resolver';

describe('UserNewResolver', () => {
  let resolver: UserNewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserNewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
