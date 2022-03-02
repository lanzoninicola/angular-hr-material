import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewListTableComponent } from './interview-list-table.component';

describe('InterviewListTableComponent', () => {
  let component: InterviewListTableComponent;
  let fixture: ComponentFixture<InterviewListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
