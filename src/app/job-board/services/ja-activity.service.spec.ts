import { TestBed } from '@angular/core/testing';

import { JaActivityService } from './ja-activity.service';

describe('JaActivityService', () => {
  let service: JaActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
