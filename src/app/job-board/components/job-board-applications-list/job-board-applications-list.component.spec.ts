import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBoardApplicationsListComponent } from './job-board-applications-list.component';

describe('JobBoardApplicationsListComponent', () => {
  let component: JobBoardApplicationsListComponent;
  let fixture: ComponentFixture<JobBoardApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBoardApplicationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBoardApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
