import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationEditComponent } from './job-application-edit.component';

describe('JobApplicationEditComponent', () => {
  let component: JobApplicationEditComponent;
  let fixture: ComponentFixture<JobApplicationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
