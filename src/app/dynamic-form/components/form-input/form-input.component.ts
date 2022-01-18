import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'app-form-input',
  template: `
    <div [formGroup]="parentFormGroup">
      <mat-form-field>
        <mat-label>{{ config['label'] }}</mat-label>
        <input
          matInput
          placeholder="{{ config['label'] }}"
          [formControlName]="config['key']"
          [type]="config['type']"
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
  @Input()
  config: { [key: string]: any } = {};

  parentFormGroup: FormGroup;

  constructor(private df: DynamicFormService) {}

  ngOnInit(): void {
    this.parentFormGroup = this.df.getFormGroup(this.config['groupName']);
  }
}
