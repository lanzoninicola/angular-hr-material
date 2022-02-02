import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardEditFormComponent } from './job-board-edit-form.component';

describe('JobBoardEditFormComponent', () => {
  let component: JobBoardEditFormComponent;
  let fixture: ComponentFixture<JobBoardEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBoardEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBoardEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
