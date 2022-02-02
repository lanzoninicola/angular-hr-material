import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardSectionComponent } from './job-board-section.component';

describe('JobBoardSectionComponent', () => {
  let component: JobBoardSectionComponent;
  let fixture: ComponentFixture<JobBoardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBoardSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBoardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
