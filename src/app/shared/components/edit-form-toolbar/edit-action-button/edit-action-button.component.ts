import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton } from 'src/app/shared/types/action-button.types';

@Component({
  selector: 'ahr-edit-action-button',
  template: `
    <div
      class="button-wrapper"
      [attr.aria-disabled]="disabled"
      (click)="onClick()"
    >
      <button mat-icon-button aria-label="label" [disabled]="disabled">
        <mat-icon aria-hidden="false" aria-label="label">{{
          matIcon
        }}</mat-icon>
      </button>
      <span class="button-label">{{ label }}</span>
    </div>
  `,
  styleUrls: ['./edit-action-button.component.scss'],
})
export class EditActionButtonComponent implements OnInit {
  @Input()
  action: string;

  @Input()
  disabled: boolean;

  @Output()
  actionEvent: EventEmitter<any> = new EventEmitter();

  basicActions: { [key: string]: ActionButton } = { ...EDIT_ACTIONS };
  label: string;
  matIcon: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.disabled);
    if (!this.basicActions.hasOwnProperty(this.action)) {
      throw `EditActionButtonComponent - No button found with the action ${this.action}`;
    }

    const buttonData = this.basicActions[this.action];
    this.label = buttonData.label;
    this.matIcon = buttonData.matIcon;
  }

  onClick() {
    if (!this.disabled) {
      this.actionEvent.emit();
    }
  }
}

const EDIT_ACTIONS: { [key: string]: ActionButton } = {
  save: {
    key: 'save',
    label: 'Save',
    matIcon: 'save',
  },
  disable: {
    key: 'disable',
    label: 'Disable',
    matIcon: 'block',
  },
  remove: {
    key: 'remove',
    label: 'Remove',
    matIcon: 'clear',
  },
};
