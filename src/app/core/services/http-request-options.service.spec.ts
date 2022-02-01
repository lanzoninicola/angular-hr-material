import { TestBed } from '@angular/core/testing';

import { HttpRequestOptionsService } from './http-request-options.service';

describe('HttpRequestOptionsService', () => {
  let service: HttpRequestOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
