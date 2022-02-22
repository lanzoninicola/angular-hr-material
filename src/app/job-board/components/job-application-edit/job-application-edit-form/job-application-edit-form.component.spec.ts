import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationEditFormComponent } from './job-application-edit-form.component';

describe('JobApplicationEditFormComponent', () => {
  let component: JobApplicationEditFormComponent;
  let fixture: ComponentFixture<JobApplicationEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
