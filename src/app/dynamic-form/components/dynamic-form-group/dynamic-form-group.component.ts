import { Component, Input, OnInit } from '@angular/core';
import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from '../../types/dynamic-form.types';

@Component({
  selector: 'ahr-dynamic-form-group',
  template: `
    <div class="form-group">
      <h2 class="form-group-title">{{ title }}</h2>
      <ng-content *dynamicFields="childrenControls; parentGroupName: name">
      </ng-content>
    </div>
  `,
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent implements OnInit {
  @Input()
  viewConfig: {
    key: FormGroupConfiguration;
    value: FormControlConfiguration[];
  } = {
    key: { key: '', title: '' },
    value: [],
  };

  name: string = '';
  title: string = '';
  childrenControls: FormControlConfiguration[] = [];

  constructor() {}

  ngOnInit(): void {
    this.name = this.viewConfig['key']['key'];
    this.title = this.viewConfig['key']['title'];
    this.childrenControls = this.viewConfig['value'];
  }
}
