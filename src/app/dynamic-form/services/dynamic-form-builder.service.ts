import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Helper from 'src/app/core/helpers/helpers';

import { TemplateMap } from '../types/template.types';
import { FormViewTemplateService } from './form-view-template.service';

// TODO: cache the template && invalidate cache
// TODO: verify if all methods are return types

interface FormControlModelConfig {
  initState: string;
  syncValidators: [];
  asyncValidators?: [];
}

type FormControlKey = string;

type FormGroupKey = string;

/**
 *  Responsible to build the Reactive Form Model starting by a template
 */

@Injectable({
  providedIn: 'root',
})
export class DynamicFormBuilderService {
  /**
   * @description Template for the Dynamic Form
   */
  viewTemplate: TemplateMap;

  formModel: FormGroup;

  formKeysMap: Map<FormControlKey, FormGroupKey> = new Map();

  constructor(private formViewTemplate: FormViewTemplateService) {
    this.viewTemplate = formViewTemplate.getTemplate();
  }

  /**
   *
   * @description
   * Returns the model of Form given a template
   *
   */
  buildModel(): FormGroup {
    if (this.formViewTemplate.shouldEmpty()) {
      this.formModel = new FormGroup({});
      return this.formModel;
    }

    this._generateMapOfFormKeys();

    const childrenGroup = Helper.mapToObjectLiteral(this._childrenGroup());

    this.formModel = new FormGroup(childrenGroup);
    return this.formModel;
  }

  /**
   * @description
   * Returns the 'FormGroup' object of main form
   *
   * @returns FormGroup object
   */
  getMainFormGroupModel() {
    return this.formModel;
  }

  /**
   * @description
   * Returns the 'FormGroup' object given a form group name
   * Note: This method manages only one level of indentation
   *
   * @param name The key of FormGroup
   * @returns FormGroup object
   */
  getFormGroup(name: string): FormGroup {
    if (this.formModel.contains(name)) {
      return this.formModel.controls[name] as FormGroup;
    }

    return new FormGroup({});
  }

  /**
   * @description
   * Set the value of FormControl
   *
   *
   * @param group - The FormGroup name
   * @param controls - It is an object of all FormControls that belong to a FormGroup
   *
   * {
   *  FormControlKey1: FormControlName1,
   * FormControlKey2: FormControlName2
   * }
   *
   */
  setControlsValue(
    group: FormGroupKey,
    controls: { [key: string]: FormControlKey | undefined }
  ) {
    if (this.formModel && this.formModel !== null) {
      Object.keys(controls).forEach((key) => {
        let formControl = this.formModel!.get([group, key]);

        if (formControl && formControl !== null) {
          formControl.setValue(controls[key]);
        } else {
          throw `The FormControl '${key}' not found in the group '${group}'. Did you spell it wrong?`;
        }
      });
    }
  }

  /**
   * @description
   * Get the values of all controls of the form
   *
   */
  getControlsValues(): { [key: FormControlKey]: string } {
    let formValues: { [key: string]: string } = {};

    for (const [controlKey, groupKey] of this.formKeysMap) {
      let controlValue = this.formModel!.get([groupKey, controlKey])!.value;
      formValues[controlKey] = controlValue.trim();
    }

    return formValues;
  }

  /**
   * @description
   * This reset the FormGroup used when the component is destroyed
   *
   */
  destroy(): void {
    this.formModel = new FormGroup({});
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
    let childrenGroup: Map<FormGroupKey, FormGroup> = new Map();

    for (const [group, controls] of this.viewTemplate) {
      const childrenControlsModel = this._createControls(controls);
      childrenGroup.set(group.key, new FormGroup(childrenControlsModel));
    }

    return childrenGroup;
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
   * Returns an instance of 'FormControl' given the config
   *
   */
  private _createControl(controlConfig: FormControlModelConfig) {
    const { initState, syncValidators, asyncValidators } = controlConfig;
    return new FormControl(initState, syncValidators, asyncValidators);
  }

  /**
   * @description
   * Generates a map of FormControl Key with related FormGroup key
   *
   */
  private _generateMapOfFormKeys() {
    for (const [group, controls] of this.viewTemplate) {
      const { key: groupKey } = group;

      controls.forEach((control) => {
        const { key: controlKey } = control;
        this.formKeysMap.set(controlKey, groupKey);
      });
    }
  }
}
