import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighPriorityIconComponent } from './high-priority-icon.component';

describe('HighPriorityIconComponent', () => {
  let component: HighPriorityIconComponent;
  let fixture: ComponentFixture<HighPriorityIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighPriorityIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighPriorityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
