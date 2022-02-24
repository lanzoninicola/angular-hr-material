import { Component, Input, OnInit } from '@angular/core';

import { FormGroupConfiguration } from '../../types/dynamic-form.types';
import { FormControlConfig } from '../../types/form-control.types';

@Component({
  selector: 'ahr-dynamic-form-group',
  template: `
    <div class="form-group">
      <h3 class="form-group-title">{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="form-group-content">
        <ng-content *dynamicFields="childrenControls; parentGroupName: name">
        </ng-content>
      </div>
      <mat-divider *ngIf="divider"></mat-divider>
    </div>
  `,
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent implements OnInit {
  @Input()
  viewConfig: {
    key: FormGroupConfiguration;
    value: FormControlConfig[];
  } = {
    key: { key: '', title: '' },
    value: [],
  };

  @Input()
  divider: boolean = true;

  name: string = '';
  title: string | undefined = '';
  description: string | undefined = '';
  childrenControls: FormControlConfig[] = [];

  constructor() {}

  ngOnInit(): void {
    this.name = this.viewConfig['key']['key'];
    this.title = this.viewConfig['key']['title'];
    this.description = this.viewConfig['key']['description'];
    this.childrenControls = this.viewConfig['value'];
  }
}
