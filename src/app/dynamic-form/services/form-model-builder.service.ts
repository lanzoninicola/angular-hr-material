import { Injectable } from '@angular/core';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import Helper from 'src/app/core/helpers/helpers';

import {
  FormControlConfigKey,
  FormControlConfig,
} from '../types/form-control.types';
import { FormGroupKey } from '../types/form-group.types';
import { FormViewTemplate } from '../types/template.types';

// TODO: cache the template && invalidate cache
// TODO: verify if all methods are return types

/**
 *  Responsible to build the Reactive Form Model starting by a template
 */

@Injectable({
  providedIn: 'root',
})
export class FormModelBuilderService {
  _viewTemplate: FormViewTemplate;

  _formModel: FormGroup;

  _formKeysMap: Map<FormControlConfigKey, FormGroupKey> = new Map();

  get(): FormGroup {
    return this._formModel;
  }

  get formKeysMap() {
    return this._formKeysMap;
  }

  constructor() {}

  /**
   *
   * @description
   * Returns the model of Form given a template
   *
   */
  build(viewTemplate: FormViewTemplate) {
    if (viewTemplate.size === 0) {
      throw 'Dynamic Form Builder - The view template is missing. Before building the model you must provide a valid template. Build the view before.';
    }

    this._viewTemplate = viewTemplate;

    this._generateMapOfFormKeys();

    const childrenGroup = Helper.mapToObjectLiteral(this._childrenGroup());

    this._formModel = new FormGroup(childrenGroup);
  }

  /**
   * @description
   * This reset the FormGroup used when the component is destroyed
   *
   */
  destroy(): void {
    this._formModel = new FormGroup({});
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

    for (const [group, controls] of this._viewTemplate) {
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
  private _createControls(controls: FormControlConfig[]): {
    [key: FormControlConfigKey]: FormControl;
  } {
    const groupFormControls: { [key: FormControlConfigKey]: FormControl } = {};

    controls.forEach((config: FormControlConfig) => {
      const { key, syncValidators, asyncValidators } = config;

      const initialValue = null; // do not change this logic!
      const disabled = config.disabled || false;

      groupFormControls[key] = this._createControl({
        initialValue,
        disabled,
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
  private _createControl(controlConfig: {
    initialValue: any;
    disabled: boolean;
    syncValidators?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null;
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  }): FormControl {
    const { initialValue, disabled, syncValidators, asyncValidators } =
      controlConfig;
    return new FormControl(
      { value: initialValue, disabled },
      syncValidators,
      asyncValidators
    );
  }

  /**
   * @description
   * Generates a map of FormControl Key with related FormGroup key
   *
   */
  private _generateMapOfFormKeys() {
    for (const [group, controls] of this._viewTemplate) {
      const { key: groupKey } = group;

      controls.forEach((control) => {
        const { key: controlKey } = control;
        this._formKeysMap.set(controlKey, groupKey);
      });
    }
  }
}
