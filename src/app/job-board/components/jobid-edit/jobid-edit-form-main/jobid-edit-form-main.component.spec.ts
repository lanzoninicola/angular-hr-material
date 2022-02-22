import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidEditFormMainComponent } from './jobid-edit-form-main.component';

describe('JobidEditFormMainComponent', () => {
  let component: JobidEditFormMainComponent;
  let fixture: ComponentFixture<JobidEditFormMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidEditFormMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidEditFormMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
