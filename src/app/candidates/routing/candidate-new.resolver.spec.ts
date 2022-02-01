import { TestBed } from '@angular/core/testing';

import { CandidateNewResolver } from './candidate-new.resolver';

describe('CandidateNewResolver', () => {
  let resolver: CandidateNewResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CandidateNewResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
