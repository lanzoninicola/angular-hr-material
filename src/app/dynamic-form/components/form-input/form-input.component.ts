import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormService } from '../../services/dynamic-form.service';
import { InputTextConfig } from '../../types/form-control.types';

@Component({
  selector: 'ahr-form-input',
  template: `
    <div
      [formGroup]="parentFormGroupModel"
      [ngClass]="controlConfig['hidden'] ? 'hidden' : ''"
    >
      <mat-form-field>
        <mat-label>{{ controlConfig['label'] }}</mat-label>
        <input
          matInput
          placeholder="{{ controlConfig['label'] }}"
          [readonly]="controlConfig['readonly']"
          [formControlName]="controlConfig['key']"
          [type]="controlConfig['type']"
        />
        <!-- <mat-error *ngIf="!control.valid && control.touched"
          >{{ controlConfig['label'] }} is not valid!</mat-error
        > -->
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  /**
   * Inputs from directive: DynamicFields
   */
  controlConfig: InputTextConfig;
  parentGroupName: string;

  control: AbstractControl;
  parentFormGroupModel: FormGroup;

  readonly: boolean = false;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this._dynamicForm.findFormGroupByName(
      this.parentGroupName
    );

    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];

    this.readonly = this.controlConfig['readonly'] || false;
  }
}
