import { TestBed } from '@angular/core/testing';

import { JobidEditResolver } from './jobid-edit.resolver';

describe('JobidEditResolver', () => {
  let resolver: JobidEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(JobidEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
