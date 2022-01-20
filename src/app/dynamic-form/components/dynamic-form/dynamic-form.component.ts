import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <form [formGroup]="mainForm">
      <div *ngFor="let groupConfig of formTemplate | keyvalue">
        <ahr-dynamic-form-group [groupConfig]="groupConfig">
        </ahr-dynamic-form-group>
      </div>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input()
  formTemplate: {};

  mainForm: FormGroup;

  constructor(private df: DynamicFormService) {}

  ngOnInit(): void {
    this.mainForm = this.df.buildModel(this.formTemplate);
  }
}
