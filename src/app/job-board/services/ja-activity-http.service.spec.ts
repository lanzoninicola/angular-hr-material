import { TestBed } from '@angular/core/testing';

import { JaActivityHttpService } from './ja-activity-http.service';

describe('JaActivityHttpService', () => {
  let service: JaActivityHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaActivityHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
