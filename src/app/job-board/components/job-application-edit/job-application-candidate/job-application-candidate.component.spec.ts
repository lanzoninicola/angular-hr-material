import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationCandidateComponent } from './job-application-candidate.component';

describe('JobApplicationCandidateComponent', () => {
  let component: JobApplicationCandidateComponent;
  let fixture: ComponentFixture<JobApplicationCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
