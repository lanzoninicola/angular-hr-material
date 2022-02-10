import { TestBed } from '@angular/core/testing';

import { DepartmentsFormControlResolver } from './departments-form-control.resolver';

describe('DepartmentsFormControlResolver', () => {
  let resolver: DepartmentsFormControlResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DepartmentsFormControlResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
