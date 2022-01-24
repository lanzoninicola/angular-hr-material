import { Injectable } from '@angular/core';

import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from '../types/dynamic-form.types';
import { TemplateMap } from '../types/template.types';

// TODO: cache the template && invalidate cache

@Injectable({
  providedIn: 'root',
})
export class FormViewTemplateService {
  template: TemplateMap = new Map();

  constructor() {}

  getTemplate(): TemplateMap {
    return this.template;
  }

  /**
   * @description
   * Let configures the template adding form groups
   *
   */
  addGroup(
    group: FormGroupConfiguration,
    controls: FormControlConfiguration[]
  ) {
    this.template.set(group, controls);
  }

  /**
   * @description
   * This checks if the template is empty
   *
   */
  shouldEmpty(): boolean {
    if (this.template.size === 0) {
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
    for (const [key] of this.template) {
      this.template.delete(key);
    }
  }
}