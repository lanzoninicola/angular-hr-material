import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormToolbarComponent } from './edit-form-toolbar.component';

describe('EditFormToolbarComponent', () => {
  let component: EditFormToolbarComponent;
  let fixture: ComponentFixture<EditFormToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
