import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationStatusFormComponent } from './job-application-status-form.component';

describe('JobApplicationStatusFormComponent', () => {
  let component: JobApplicationStatusFormComponent;
  let fixture: ComponentFixture<JobApplicationStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
