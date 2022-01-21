import { TestBed } from '@angular/core/testing';

import { FormViewTemplateService } from './form-view-template.service';

describe('FormViewTemplateService', () => {
  let service: FormViewTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormViewTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
