import { TestBed } from '@angular/core/testing';

import { FormModelBuilderService } from './form-model-builder.service';

describe('FormModelBuilderService', () => {
  let service: FormModelBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormModelBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
