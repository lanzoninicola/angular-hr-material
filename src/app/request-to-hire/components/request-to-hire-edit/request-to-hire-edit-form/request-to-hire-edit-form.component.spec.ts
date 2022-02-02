import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToHireEditFormComponent } from './request-to-hire-edit-form.component';

describe('RequestToHireEditFormComponent', () => {
  let component: RequestToHireEditFormComponent;
  let fixture: ComponentFixture<RequestToHireEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToHireEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToHireEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
