import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackEditFormComponent } from './interview-feedback-edit-form.component';

describe('InterviewFeedbackEditFormComponent', () => {
  let component: InterviewFeedbackEditFormComponent;
  let fixture: ComponentFixture<InterviewFeedbackEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewFeedbackEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFeedbackEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
