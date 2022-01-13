import { TestBed } from '@angular/core/testing';

import { UserEditResolver } from './user-edit.resolver';

describe('UserEditResolver', () => {
  let resolver: UserEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
