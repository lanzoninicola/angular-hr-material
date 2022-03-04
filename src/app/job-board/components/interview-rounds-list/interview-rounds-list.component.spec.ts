import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewRoundsListComponent } from './interview-rounds-list.component';

describe('InterviewRoundsListComponent', () => {
  let component: InterviewRoundsListComponent;
  let fixture: ComponentFixture<InterviewRoundsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewRoundsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewRoundsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
