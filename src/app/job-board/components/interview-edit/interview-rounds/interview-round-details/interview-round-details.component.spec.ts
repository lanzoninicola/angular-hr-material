import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRoundDetailsComponent } from './interview-round-details.component';

describe('InterviewRoundDetailsComponent', () => {
  let component: InterviewRoundDetailsComponent;
  let fixture: ComponentFixture<InterviewRoundDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewRoundDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewRoundDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
