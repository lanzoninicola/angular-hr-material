import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionButtonComponent } from './edit-action-button.component';

describe('EditActionButtonComponent', () => {
  let component: EditActionButtonComponent;
  let fixture: ComponentFixture<EditActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
