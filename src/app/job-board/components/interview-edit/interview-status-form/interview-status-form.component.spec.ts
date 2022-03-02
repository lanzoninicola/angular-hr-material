import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStatusFormComponent } from './interview-status-form.component';

describe('InterviewStatusFormComponent', () => {
  let component: InterviewStatusFormComponent;
  let fixture: ComponentFixture<InterviewStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
