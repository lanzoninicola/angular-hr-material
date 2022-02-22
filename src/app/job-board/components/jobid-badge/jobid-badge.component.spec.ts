import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobidBadgeComponent } from './jobid-badge.component';

describe('JobidBadgeComponent', () => {
  let component: JobidBadgeComponent;
  let fixture: ComponentFixture<JobidBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobidBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobidBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
