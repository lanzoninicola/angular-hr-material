import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateIdBadgeComponent } from './candidate-id-badge.component';

describe('CandidateIdBadgeComponent', () => {
  let component: CandidateIdBadgeComponent;
  let fixture: ComponentFixture<CandidateIdBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateIdBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateIdBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
