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
      <button
        mat-icon-button
        attr.aria-label="{{ label }}"
        [disabled]="disabled"
      >
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
  label: string;

  @Input('icon')
  matIcon: string;

  @Input()
  disabled: boolean;

  @Output()
  actionEvent: EventEmitter<any> = new EventEmitter();

  basicActions: { [key: string]: ActionButton } = { ...EDIT_ACTIONS };

  constructor() {}

  ngOnInit(): void {
    if (this.action) {
      this.label = this.basicActions[this.action]['label'];
      this.matIcon = this.basicActions[this.action]['matIcon'];
    }

    if (!this.action) {
      if (!this.label) {
        throw new Error(
          'EditActionButtonComponent - "label" is required or "action" must be provided'
        );
      }

      if (!this.matIcon) {
        throw new Error(
          'EditActionButtonComponent - "icon" is required or "action" must be provided'
        );
      }
    }
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
