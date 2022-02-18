import { TestBed } from '@angular/core/testing';

import { BoardTemplateHttpService } from './board-template-http.service';

describe('BoardTemplateHttpService', () => {
  let service: BoardTemplateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardTemplateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
