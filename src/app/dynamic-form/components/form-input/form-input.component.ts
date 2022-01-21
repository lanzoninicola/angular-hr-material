import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';
import { FormControlConfiguration } from '../../types/dynamic-form.types';
import { FormControlInputTextConfig } from '../../types/form-control.types';

@Component({
  selector: 'ahr-form-input',
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
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  /**
   * Inputs from directive: DynamicFields
   */
  controlConfig: FormControlInputTextConfig;
  parentGroupName: string;

  control: AbstractControl;
  parentFormGroupModel: FormGroup;

  constructor(private dynamicFormBuilder: DynamicFormBuilderService) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this.dynamicFormBuilder.getFormGroup(
      this.parentGroupName
    );

    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];
  }
}
