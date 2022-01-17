import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * const userEditForm2 = {
  personalInfo: {
    groupTitle: 'Personal Information',
    controls: [
      {
        controlType: 'input',
        label: 'Text Input',
        key: 'some text',
        value: 'This input is pre-populated',
        syncValidators: [Validators.required],
      },
      {
        controlType: 'input',
        label: 'Password Input',
        key: 'password',
        type: 'password',
        syncValidators: [Validators.required, Validators.minLength(8)],
      },
      {
        controlType: 'select',
        label: 'Dropdown Menu',
        key: 'dropdown',
        syncValidators: [Validators.required],
        whatToSelect: 'a topic',
        selectOptions: [
          { value: 'option1' },
          { value: 'option2' },
          { value: 'option3' },
          { value: 'option4' },
        ],
      },
    ],
  },
  companyRoleInfo: {
    groupTitle: 'Personal Information',
    controls: [
      {
        controlType: 'input',
        label: 'Text Input',
        key: 'some text',
        value: 'This input is pre-populated',
        syncValidators: [Validators.required],
      },
      {
        controlType: 'input',
        label: 'Password Input',
        key: 'password',
        type: 'password',
        syncValidators: [Validators.required, Validators.minLength(8)],
      },
     
    ],
  },
};
 */

@Component({
  selector: 'ahr-form',
  template: `
    <div class="container">
      <form [formGroup]="mainForm" (ngSubmit)="onSubmit()">
        <ahr-form-group
          *ngFor="let formGroup of formTemplate; let i = index"
          [formControls]="formTemplate"
          [name]="formGroup.group"
        ></ahr-form-group>
      </form>
    </div>
  `,
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  mainForm: FormGroup;

  @Input('template')
  formTemplate: any[];

  ngOnInit() {
    console.log(this.formTemplate);
    let formGroups: any = {};
    let formGroupsObject: any = {};

    this.formTemplate.forEach((fControl) => {
      let formControl = new FormControl(
        fControl.value,
        fControl.syncValidators,
        fControl.asyncValidators
      );

      formGroups = {
        ...formGroups,
        [fControl.group]: {
          ...formGroups[fControl.group],
          [fControl.key]: formControl,
        },
      };
    });

    Object.keys(formGroups).forEach((formGroupName) => {
      formGroupsObject = {
        ...formGroupsObject,
        [formGroupName]: new FormGroup(formGroups[formGroupName]),
      };
    });

    this.mainForm = new FormGroup(formGroupsObject);
  }

  onSubmit() {}
}
