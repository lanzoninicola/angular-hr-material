import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionToolbarComponent } from './section-toolbar.component';

describe('SectionToolbarComponent', () => {
  let component: SectionToolbarComponent;
  let fixture: ComponentFixture<SectionToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
