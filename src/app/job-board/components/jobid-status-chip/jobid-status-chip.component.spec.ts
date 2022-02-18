import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobIdStatusChipComponent } from './jobid-status-chip.component';

describe('JobIdStatusChipComponent', () => {
  let component: JobIdStatusChipComponent;
  let fixture: ComponentFixture<JobIdStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobIdStatusChipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobIdStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
