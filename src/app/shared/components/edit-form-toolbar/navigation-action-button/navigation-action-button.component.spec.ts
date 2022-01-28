import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationActionButtonComponent } from './navigation-action-button.component';

describe('NavigationActionButtonComponent', () => {
  let component: NavigationActionButtonComponent;
  let fixture: ComponentFixture<NavigationActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationActionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
