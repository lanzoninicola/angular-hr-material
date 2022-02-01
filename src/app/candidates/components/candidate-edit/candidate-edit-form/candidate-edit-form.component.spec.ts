import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEditFormComponent } from './candidate-edit-form.component';

describe('CandidateEditFormComponent', () => {
  let component: CandidateEditFormComponent;
  let fixture: ComponentFixture<CandidateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
