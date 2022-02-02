import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToHireSectionComponent } from './request-to-hire-section.component';

describe('RequestToHireSectionComponent', () => {
  let component: RequestToHireSectionComponent;
  let fixture: ComponentFixture<RequestToHireSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToHireSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToHireSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
