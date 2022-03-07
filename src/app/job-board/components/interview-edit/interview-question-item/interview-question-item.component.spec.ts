import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewQuestionItemComponent } from './interview-question-item.component';

describe('InterviewQuestionItemComponent', () => {
  let component: InterviewQuestionItemComponent;
  let fixture: ComponentFixture<InterviewQuestionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewQuestionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewQuestionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
