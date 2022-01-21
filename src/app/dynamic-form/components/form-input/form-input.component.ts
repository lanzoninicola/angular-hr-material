import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';

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
        <!-- <mat-error *ngIf="!control.valid && control.touched"
        >{{ config['label'] }} is not valid!</mat-error
      > -->
      </mat-form-field>
    </div>
  `,
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  controlConfig: { [key: string]: any } = {};

  parentFormGroupModel: FormGroup;

  constructor(private dynamicformbuilder: DynamicFormBuilderService) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this.dynamicformbuilder.getFormGroup(
      this.controlConfig['parentGroupName']
    );
  }
}
// TODO: build an interface for SELECT view config
