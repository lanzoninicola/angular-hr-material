import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidEditComponent } from './jobid-edit.component';

describe('JobidEditComponent', () => {
  let component: JobidEditComponent;
  let fixture: ComponentFixture<JobidEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
