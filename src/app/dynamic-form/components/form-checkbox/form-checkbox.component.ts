import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormService } from '../../services/dynamic-form.service';
import { InputCheckboxConfig } from '../../types/form-control.types';

@Component({
  selector: 'ahr-form-checkbox',
  template: ` <div [formGroup]="parentFormGroupModel">
    <mat-checkbox
      [labelPosition]="labelPosition"
      [formControlName]="controlConfig['key']"
    >
      {{ controlConfig['label'] }}
    </mat-checkbox>
  </div>`,
  styleUrls: ['./form-checkbox.component.scss'],
})
export class FormCheckboxComponent implements OnInit {
  checked = false;
  labelPosition: 'before' | 'after' = 'after';

  // START: Inputs from directive: DynamicFields
  controlConfig: InputCheckboxConfig;
  parentGroupName: string;
  // END: Inputs from directive: DynamicFields

  control: AbstractControl;
  parentFormGroupModel: FormGroup;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this._dynamicForm.getFormGroup(
      this.parentGroupName
    );

    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];
  }
}
