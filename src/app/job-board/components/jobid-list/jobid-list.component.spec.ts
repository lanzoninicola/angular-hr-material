import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidListComponent } from './jobid-list.component';

describe('JobidListComponent', () => {
  let component: JobidListComponent;
  let fixture: ComponentFixture<JobidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
