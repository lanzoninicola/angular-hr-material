import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidEditFormDetailsComponent } from './jobid-edit-form-details.component';

describe('JobidEditFormDetailsComponent', () => {
  let component: JobidEditFormDetailsComponent;
  let fixture: ComponentFixture<JobidEditFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidEditFormDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidEditFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
