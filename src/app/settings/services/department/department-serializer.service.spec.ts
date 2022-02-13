import { TestBed } from '@angular/core/testing';

import { DepartmentSerializerService } from './department-serializer.service';

describe('DepartmentSerializerService', () => {
  let service: DepartmentSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
