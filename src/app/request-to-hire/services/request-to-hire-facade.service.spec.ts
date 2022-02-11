import { TestBed } from '@angular/core/testing';

import { RequestToHireFacadeService } from './request-to-hire-facade.service';

describe('RequestToHireFacadeService', () => {
  let service: RequestToHireFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestToHireFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
