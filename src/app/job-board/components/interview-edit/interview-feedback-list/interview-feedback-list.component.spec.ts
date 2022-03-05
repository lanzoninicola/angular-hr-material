import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackListComponent } from './interview-feedback-list.component';

describe('InterviewFeedbackListComponent', () => {
  let component: InterviewFeedbackListComponent;
  let fixture: ComponentFixture<InterviewFeedbackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewFeedbackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFeedbackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
