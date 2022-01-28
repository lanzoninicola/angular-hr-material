import { Injectable } from '@angular/core';

import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from '../types/dynamic-form.types';
import { FormViewTemplate } from '../types/template.types';

@Injectable({
  providedIn: 'root',
})
export class FormViewBuilderService {
  _template: FormViewTemplate = new Map();

  constructor() {}

  get(): FormViewTemplate {
    return this._template;
  }

  /**
   * @description
   * Let configures the template adding form groups
   *
   */
  build(group: FormGroupConfiguration, controls: FormControlConfiguration[]) {
    this._template.set(group, controls);
  }

  /**
   * @description
   * This checks if the template is empty
   *
   */
  shouldEmpty(): boolean {
    if (this._template.size === 0) {
      return true;
    }

    return false;
  }

  /**
   * @description
   * This remove the template when the component is destroyed
   *
   */
  destroy(): void {
    for (const [key] of this._template) {
      this._template.delete(key);
    }
  }
}
