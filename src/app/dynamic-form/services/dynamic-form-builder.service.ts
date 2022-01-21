import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TemplateMap } from '../types/template.types';
import { FormViewTemplateService } from './form-view-template.service';

// TODO: cache the template && invalidate cache

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

    const childrenGroup = Array.from(this._childrenGroup()).reduce(
      (obj: { [key: string]: any }, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );

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
   * Returns an instance of 'FormControl' give the config
   *
   */
  private _createControl(controlConfig: FormControlModelConfig) {
    const { initState, syncValidators, asyncValidators } = controlConfig;
    return new FormControl(initState, syncValidators, asyncValidators);
  }
}
