import { TestBed } from '@angular/core/testing';

import { JobidNewResolver } from './jobid-new.resolver';

describe('JobidNewResolver', () => {
  let resolver: JobidNewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobidNewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
