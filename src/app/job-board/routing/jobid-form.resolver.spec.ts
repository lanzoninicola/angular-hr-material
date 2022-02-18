import { TestBed } from '@angular/core/testing';

import { JobidFormResolver } from './jobid-form.resolver';

describe('JobidFormResolver', () => {
  let resolver: JobidFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobidFormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
