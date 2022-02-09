import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusChipComponent } from './request-status-chip.component';

describe('RequestStatusChipComponent', () => {
  let component: RequestStatusChipComponent;
  let fixture: ComponentFixture<RequestStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStatusChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
