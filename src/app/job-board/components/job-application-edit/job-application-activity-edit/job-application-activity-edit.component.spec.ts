import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationActivityEditComponent } from './job-application-activity-edit.component';

describe('JobApplicationActivityEditComponent', () => {
  let component: JobApplicationActivityEditComponent;
  let fixture: ComponentFixture<JobApplicationActivityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationActivityEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationActivityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
