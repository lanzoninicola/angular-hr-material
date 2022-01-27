import { TestBed } from '@angular/core/testing';

import { ModuleStoreService } from './module-store.service';

describe('ModuleStoreService', () => {
  let service: ModuleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
