import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationActivityListComponent } from './job-application-activity-list.component';

describe('JobApplicationActivityListComponent', () => {
  let component: JobApplicationActivityListComponent;
  let fixture: ComponentFixture<JobApplicationActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationActivityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
