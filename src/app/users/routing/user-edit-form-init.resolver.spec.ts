import { TestBed } from '@angular/core/testing';

import { UserEditFormInitResolver } from './user-edit-form-init.resolver';

describe('UserEditFormInitResolver', () => {
  let resolver: UserEditFormInitResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserEditFormInitResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
