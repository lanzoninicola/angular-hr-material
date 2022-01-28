import { TestBed } from '@angular/core/testing';

import { FormViewBuilderService } from './form-view-builder.service';

describe('FormViewBuilderService', () => {
  let service: FormViewBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormViewBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
