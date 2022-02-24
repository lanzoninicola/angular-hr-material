import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationActivityNewComponent } from './job-application-activity-new.component';

describe('JobApplicationActivityNewComponent', () => {
  let component: JobApplicationActivityNewComponent;
  let fixture: ComponentFixture<JobApplicationActivityNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationActivityNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationActivityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
