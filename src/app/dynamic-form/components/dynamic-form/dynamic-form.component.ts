import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <form [formGroup]="formModel">
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

  @Input()
  formModel: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
