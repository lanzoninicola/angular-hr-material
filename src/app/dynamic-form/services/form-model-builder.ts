import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import Helper from 'src/app/core/helpers/helpers';

import { FormGroupConfiguration } from '../types/dynamic-form.types';
import {
  FormControlConfig,
  FormControlConfigKey,
} from '../types/form-control.types';
import { FormGroupKey } from '../types/form-group.types';
import { FormSettings } from '../types/template.types';

// TODO: cache the template && invalidate cache
// TODO: verify if all methods are return types

/**
 *  Responsible to build the Reactive Form Model starting by a configuration
 */
export class FormModelBuilder {
  private _formSettings: FormSettings = new Map();

  private _formModel: FormGroup;

  // private _formKeysMap: Map<FormControlConfigKey, FormGroupKey> = new Map();

  get model(): FormGroup {
    return this._formModel;
  }

  get settings(): FormSettings {
    return this._formSettings;
  }

  // get formKeysMap() {
  //   return this._formKeysMap;
  // }

  constructor() {}

  /**
   * @description
   * Setting up the FormGroup configuration given a configuration
   */
  setup(group: FormGroupConfiguration, controls: FormControlConfig[]) {
    this._loadConfiguration(group, controls);

    this._build();
  }

  private _loadConfiguration(
    group: FormGroupConfiguration,
    controls: FormControlConfig[]
  ) {
    if (!this._shouldSettingExist(group)) {
      this._formSettings.set(group, controls);
    }
  }

  /**
   * @description
   * Instanciate the model of Form
   */
  private _build() {
    if (this._formSettings.size === 0) {
      throw 'Dynamic Form Builder - The view template is missing. Before building the model you must provide a valid template. Build the view before.';
    }

    // this._generateMapOfFormKeys();

    const childrenGroup = Helper.mapToObjectLiteral(this._childrenGroup());

    this._formModel = new FormGroup(childrenGroup);
  }

  private _shouldSettingExist(group: FormGroupConfiguration) {
    const { key } = group;

    for (const [groupConfig, value] of this._formSettings) {
      const { key: groupKey } = groupConfig;
      if (groupKey === key) {
        return true;
      }
    }
    return false;
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

    for (const [group, controls] of this._formSettings) {
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
  // TODO: move to DynamicFormService
  // private _generateMapOfFormKeys() {
  //   for (const [group, controls] of this._formSettings) {
  //     const { key: groupKey } = group;

  //     controls.forEach((control) => {
  //       const { key: controlKey } = control;
  //       this._formKeysMap.set(controlKey, groupKey);
  //     });
  //   }
  // }
}
