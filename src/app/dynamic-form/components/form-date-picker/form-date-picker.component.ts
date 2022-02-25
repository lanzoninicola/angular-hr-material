import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { InputDateConfig } from '../../types/form-control.types';

@Component({
  selector: 'app-form-date-picker',
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
          [matDatepicker]="picker"
          [readonly]="controlConfig['readonly']"
          [formControlName]="controlConfig['key']"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <!-- <mat-error *ngIf="!control.valid && control.touched"
          >{{ controlConfig['label'] }} is not valid!</mat-error
        > -->
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./form-date-picker.component.scss'],
})
export class FormDatePickerComponent implements OnInit {
  /**
   * Inputs from directive: DynamicFields
   */
  controlConfig: InputDateConfig;
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
