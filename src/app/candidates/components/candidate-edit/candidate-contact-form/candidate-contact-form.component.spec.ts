import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateContactFormComponent } from './candidate-contact-form.component';

describe('CandidateContactFormComponent', () => {
  let component: CandidateContactFormComponent;
  let fixture: ComponentFixture<CandidateContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateContactFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
