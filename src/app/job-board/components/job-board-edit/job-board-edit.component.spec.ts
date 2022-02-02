import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardEditComponent } from './job-board-edit.component';

describe('JobBoardEditComponent', () => {
  let component: JobBoardEditComponent;
  let fixture: ComponentFixture<JobBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBoardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
