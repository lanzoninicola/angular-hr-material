import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  formModel: FormGroup;

  constructor() {}

  buildModel(formTemplate: { [key: string]: any }) {
    let formModel: { [key: string]: any } = {};

    Object.keys(formTemplate).forEach((groupName: string) => {
      const groupControlList = formTemplate[groupName];
      const groupFormControls = this.buildGroupControls(groupControlList);
      formModel[groupName] = new FormGroup(groupFormControls);
    });

    this.formModel = new FormGroup(formModel);
    return this.formModel;
  }

  /**
   * This manages only one level of indentation of Form
   *
   * @param name The key of FormGroup
   * @returns FormGroup object
   */
  getFormGroup(name: string): FormGroup | null {
    if (this.formModel.contains(name)) {
      return this.formModel.controls[name] as FormGroup;
    }

    return null;
  }

  buildGroupControls(groupControls: any) {
    const groupFormControls: { [key: string]: any } = {};

    groupControls.forEach((control: any) => {
      const { key, value, syncValidators, asyncValidators } = control;
      groupFormControls[key] = new FormControl(
        value,
        syncValidators,
        asyncValidators
      );
    });

    return groupFormControls;
  }
}
