import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidApplicationsComponent } from './jobid-applications.component';

describe('JobidApplicationsComponent', () => {
  let component: JobidApplicationsComponent;
  let fixture: ComponentFixture<JobidApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
