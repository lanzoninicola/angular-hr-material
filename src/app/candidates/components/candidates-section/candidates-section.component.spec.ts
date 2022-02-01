import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesSectionComponent } from './candidates-section.component';

describe('CandidatesSectionComponent', () => {
  let component: CandidatesSectionComponent;
  let fixture: ComponentFixture<CandidatesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
