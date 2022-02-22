import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationListComponent } from '../job-applications-list/job-board-applications-list.component';

describe('JobApplicationListComponent', () => {
  let component: JobApplicationListComponent;
  let fixture: ComponentFixture<JobApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
