import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/shared/types/action-button.types';

@Component({
  selector: 'ahr-navigation-action-button',
  template: `
    <div class="button-wrapper" disabled="disabled">
      <button
        mat-icon-button
        aria-label="label"
        [disabled]="disabled"
        (click)="onNavigationButtonClicked()"
      >
        <mat-icon aria-hidden="false" aria-label="label">{{
          matIcon
        }}</mat-icon>
      </button>
      <span class="button-label">{{
        inputLabel !== '' ? inputLabel : label
      }}</span>
    </div>
  `,
  styleUrls: ['./navigation-action-button.component.scss'],
})
export class NavigationActionButtonComponent implements OnInit {
  @Input()
  action: string;

  @Input()
  disabled: boolean = false;

  @Input('label')
  inputLabel: string = '';

  navigationActions: { [key: string]: ActionButton } = {
    ...NAVIGATION_ACTIONS,
  };
  label: string;
  matIcon: string;

  constructor(private _location: Location) {}

  ngOnInit(): void {
    if (!this.navigationActions.hasOwnProperty(this.action)) {
      throw `NavigationActionButtonComponent - No button found with the action ${this.action}`;
    }

    const buttonData = this.navigationActions[this.action];
    this.label = buttonData.label;
    this.matIcon = buttonData.matIcon;
  }

  onNavigationButtonClicked() {
    if (this.action === 'goback') {
      this._location.back();
    }
  }
}

const NAVIGATION_ACTIONS: { [key: string]: ActionButton } = {
  goback: {
    key: 'goback',
    label: 'Exit',
    matIcon: 'exit_to_app',
  },
};
