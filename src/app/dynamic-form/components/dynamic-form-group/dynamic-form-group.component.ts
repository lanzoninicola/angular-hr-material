import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-dynamic-form-group',
  template: `
    <div class="form-group">
      <ng-content *dynamicFields="groupConfig['value']"> </ng-content>
    </div>
  `,
  styleUrls: ['./dynamic-form-group.component.scss'],
})
export class DynamicFormGroupComponent implements OnInit {
  @Input()
  groupConfig: { [key: string]: any } = {};

  name: string = '';
  controlsConfig: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.name = this.groupConfig['key'];
    this.controlsConfig = this.groupConfig['value'];

    console.log(this.groupConfig);
  }
}
