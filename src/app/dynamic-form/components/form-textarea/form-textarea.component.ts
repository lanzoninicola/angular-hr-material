import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { InputTextConfig } from '../../types/form-control.types';

@Component({
  selector: 'app-form-textarea',
  template: `
    <div [formGroup]="parentFormGroupModel">
      <mat-form-field>
        <mat-label>{{ controlConfig['label'] }}</mat-label>
        <input
          matInput
          placeholder="{{ controlConfig['label'] }}"
          [formControlName]="controlConfig['key']"
          [type]="controlConfig['type']"
        />
        <mat-error *ngIf="!control.valid && control.touched"
          >{{ controlConfig['label'] }} is not valid!</mat-error
        >
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextAreaComponent implements OnInit {
  /**
   * Inputs from directive: DynamicFields
   */
  controlConfig: InputTextConfig;
  parentGroupName: string;

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
