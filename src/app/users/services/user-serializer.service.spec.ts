import { TestBed } from '@angular/core/testing';

import { UserSerializerService } from './user-serializer.service';

describe('UserSerializerService', () => {
  let service: UserSerializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSerializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
