import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';

@Component({
  selector: 'ahr-form-input',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-label>{{ viewTemplateConfig['label'] }}</mat-label>
        <input
          matInput
          placeholder="{{ viewTemplateConfig['label'] }}"
          [formControlName]="viewTemplateConfig['key']"
          [type]="viewTemplateConfig['type']"
        />
        <!-- <mat-error *ngIf="!control.valid && control.touched"
        >{{ config['label'] }} is not valid!</mat-error
      > -->
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  viewTemplateConfig: { [key: string]: any } = {};

  parentFormGroup: FormGroup;

  constructor(private df: DynamicFormBuilderService) {}

  ngOnInit(): void {
    this.parentFormGroup = this.df.getFormGroup(
      this.viewTemplateConfig['parentGroupName']
    );
  }
}
// TODO: build an interface for SELECT view config
