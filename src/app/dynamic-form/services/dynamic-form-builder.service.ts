import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface FormControlModelConfig {
  initState: string;
  syncValidators: [];
  asyncValidators?: [];
}

type FormControlKey = string;

/**
 *  Responsible to build the Reactive Form Model starting by a template
 */

@Injectable({
  providedIn: 'root',
})
export class DynamicFormBuilderService {
  viewTemplateConfig: { [key: string]: any } = {};

  formModel: FormGroup;

  constructor() {}

  /**
   *
   * @description
   * Returns the model of Form given a template
   *
   */
  buildModel(viewTemplateConfig: { [key: string]: any }): FormGroup {
    this.viewTemplateConfig = viewTemplateConfig;

    this.formModel = new FormGroup(this._childrenGroup());
    return this.formModel;
  }

  /**
   * @description
   * Returns an object literal with the list of children 'FormGroup' instances.
   *
   * {
   *  key: key of FormGroup,
   *  value: instance of FormGroup
   * }
   *
   */
  private _childrenGroup() {
    let childrenGroup: { [key: string]: any } = {};

    Object.keys(this.viewTemplateConfig).forEach((groupName: string) => {
      const childrenControlsModel = this._createControls(
        this._constrolsConfig(groupName)
      );
      childrenGroup[groupName] = new FormGroup(childrenControlsModel);
    });

    return childrenGroup;
  }

  /**
   * @description
   * Returns the array of controls config given a template
   *
   */
  private _constrolsConfig(groupName: string): { [key: string]: any }[] {
    return this.viewTemplateConfig[groupName];
  }

  /**
   * @description
   * Returns an object literal with the list of children 'FormControl' instances
   * given an array of control configurations.
   *
   * {
   *  key: key of FormControl,
   *  value: instance of FormControl
   * }
   *
   */
  private _createControls(controls: { [key: string]: any }[]): {
    [key: FormControlKey]: FormControl;
  } {
    const groupFormControls: { [key: FormControlKey]: FormControl } = {};

    controls.forEach((config: any) => {
      const { key, value: initState, syncValidators, asyncValidators } = config;
      groupFormControls[key] = this._createControl({
        initState,
        syncValidators,
        asyncValidators,
      });
    });

    return groupFormControls;
  }

  /**
   * @description
   * Returns an instance of 'FormControl' give the config
   *
   */
  private _createControl(controlConfig: FormControlModelConfig) {
    const { initState, syncValidators, asyncValidators } = controlConfig;
    return new FormControl(initState, syncValidators, asyncValidators);
  }

  /**
   * @description
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
}
