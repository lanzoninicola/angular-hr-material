import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbacksComponent } from './interview-feedbacks.component';

describe('InterviewFeedbacksComponent', () => {
  let component: InterviewFeedbacksComponent;
  let fixture: ComponentFixture<InterviewFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewFeedbacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
