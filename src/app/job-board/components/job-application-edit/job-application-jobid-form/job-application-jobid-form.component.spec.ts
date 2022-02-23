import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationJobidFormComponent } from './job-application-jobid-form.component';

describe('JobApplicationJobidFormComponent', () => {
  let component: JobApplicationJobidFormComponent;
  let fixture: ComponentFixture<JobApplicationJobidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationJobidFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationJobidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
