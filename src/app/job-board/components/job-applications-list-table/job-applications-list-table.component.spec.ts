import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsListTableComponent } from './job-applications-list-table.component';

describe('JobApplicationsListTableComponent', () => {
  let component: JobApplicationsListTableComponent;
  let fixture: ComponentFixture<JobApplicationsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationsListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
