import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackEditComponent } from './interview-feedback-edit.component';

describe('InterviewFeedbackEditComponent', () => {
  let component: InterviewFeedbackEditComponent;
  let fixture: ComponentFixture<InterviewFeedbackEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewFeedbackEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFeedbackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
