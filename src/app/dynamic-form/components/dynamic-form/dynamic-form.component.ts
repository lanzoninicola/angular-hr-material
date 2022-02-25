import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormSettings } from '../../types/template.types';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <div [formGroup]="model">
      <ahr-loading-spinner *ngIf="showSpinner"></ahr-loading-spinner>
      <div *ngFor="let groupConfig of formSettings | keyvalue">
        <ahr-dynamic-form-group [viewConfig]="groupConfig" [divider]="divider">
        </ahr-dynamic-form-group>
      </div>
    </div>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  model: FormGroup;

  @Input('settings')
  formSettings: FormSettings;

  @Input()
  showSpinner: boolean = false;

  @Input()
  divider: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
