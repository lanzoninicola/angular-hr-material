import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Helper from 'src/app/core/helpers/helpers';

import {
  FormControlKey,
  FormControlModelConfig,
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

  _formKeysMap: Map<FormControlKey, FormGroupKey> = new Map();

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
    // if (this._viewService.shouldEmpty()) {
    //   throw 'Dynamic Form Builder - Before build the model you must provide the template using the buildView() method';
    // }

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
    for (const [group, controls] of this._viewTemplate) {
      const { key: groupKey } = group;

      controls.forEach((control) => {
        const { key: controlKey } = control;
        this._formKeysMap.set(controlKey, groupKey);
      });
    }
  }
}
