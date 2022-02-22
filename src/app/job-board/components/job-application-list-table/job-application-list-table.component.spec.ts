import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationListTableComponent } from './job-application-list-table.component';

describe('JobApplicationListTableComponent', () => {
  let component: JobApplicationListTableComponent;
  let fixture: ComponentFixture<JobApplicationListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
