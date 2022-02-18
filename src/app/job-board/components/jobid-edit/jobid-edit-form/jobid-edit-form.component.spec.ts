import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidEditFormComponent } from './jobid-edit-form.component';

describe('JobidEditFormComponent', () => {
  let component: JobidEditFormComponent;
  let fixture: ComponentFixture<JobidEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
