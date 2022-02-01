import { TestBed } from '@angular/core/testing';

import { CandidateEditResolver } from './candidate-edit.resolver';

describe('CandidateEditResolver', () => {
  let resolver: CandidateEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CandidateEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
