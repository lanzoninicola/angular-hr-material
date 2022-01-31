import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormViewTemplate } from '../../types/template.types';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <form [formGroup]="model">
      <ahr-loading-spinner *ngIf="showSpinner"></ahr-loading-spinner>
      <div *ngFor="let groupViewConfig of view | keyvalue">
        <ahr-dynamic-form-group [viewConfig]="groupViewConfig">
        </ahr-dynamic-form-group>
      </div>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  model: FormGroup;

  @Input()
  view: FormViewTemplate;

  @Input()
  showSpinner: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
