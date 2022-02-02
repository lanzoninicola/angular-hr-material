import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToHireEditComponent } from './request-to-hire-edit.component';

describe('RequestToHireEditComponent', () => {
  let component: RequestToHireEditComponent;
  let fixture: ComponentFixture<RequestToHireEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToHireEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToHireEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
