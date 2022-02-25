import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationActivityFormComponent } from './job-application-activity-form.component';

describe('JobApplicationActivityFormComponent', () => {
  let component: JobApplicationActivityFormComponent;
  let fixture: ComponentFixture<JobApplicationActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationActivityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
