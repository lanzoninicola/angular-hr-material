import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToHireListComponent } from './request-to-hire-list.component';

describe('RequestToHireListComponent', () => {
  let component: RequestToHireListComponent;
  let fixture: ComponentFixture<RequestToHireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToHireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestToHireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
