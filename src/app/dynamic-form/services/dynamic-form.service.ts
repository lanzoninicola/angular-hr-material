import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 *  Intial responsbility for this class: build the Reactive Form Model of fequested form
 */
// TODO: rename this class according to its responsbility

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  formModel: FormGroup;

  constructor() {}

  buildModel(viewTemplateConfig: { [key: string]: any }) {
    let formModel: { [key: string]: any } = {};

    Object.keys(viewTemplateConfig).forEach((groupName: string) => {
      const groupControlList = viewTemplateConfig[groupName];
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

    groupControls.forEach((controlConfig: any) => {
      const { key, value, syncValidators, asyncValidators } = controlConfig;
      groupFormControls[key] = new FormControl(
        value,
        syncValidators,
        asyncValidators
      );
    });

    return groupFormControls;
  }
}
