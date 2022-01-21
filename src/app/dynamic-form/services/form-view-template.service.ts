import { Injectable } from '@angular/core';

import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from '../types/dynamic-form.types';
import { TemplateMap, TemplateObjectLiteral } from '../types/template.types';

// TODO: cache the template && invalidate cache

@Injectable({
  providedIn: 'root',
})
export class FormViewTemplateService {
  template: TemplateMap = new Map();

  constructor() {}

  getTemplate({
    format = 'map',
  }: {
    [key: string]: 'map' | 'literal';
  }): TemplateMap | TemplateObjectLiteral {
    if (format === 'literal') {
      return this._getTemplateAsLiteralObject();
    }

    return this._getTemplateAsMap();
  }

  addGroup(
    group: FormGroupConfiguration,
    controls: FormControlConfiguration[]
  ) {
    this.template.set(group, controls);
  }

  shouldEmpty(): boolean {
    if (this.template.size === 0) {
      return true;
    }

    return false;
  }

  destroy(): void {
    for (const [key] of this.template) {
      this.template.delete(key);
    }
  }

  private _getTemplateAsMap(): TemplateMap {
    return this.template;
  }

  private _getTemplateAsLiteralObject(): TemplateObjectLiteral {
    let templateObject: { [key: string]: any } = {};

    for (const [groupConfig, controlsConfig] of this.template) {
      const { key: groupKey, title: groupTitle } = groupConfig;

      const nextControlsConfig = controlsConfig.map((control) => {
        return {
          parentGroupName: groupKey,
          parentGroupTitle: groupTitle,
          ...control,
        };
      });

      templateObject[groupKey] = nextControlsConfig;
    }

    return templateObject;
  }
}
