import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';
import { FormViewTemplateService } from '../../services/form-view-template.service';
import { TemplateMap } from '../../types/template.types';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <form [formGroup]="model">
      <div *ngFor="let groupViewConfig of viewConfig | keyvalue">
        <ahr-dynamic-form-group [viewConfig]="groupViewConfig">
        </ahr-dynamic-form-group>
      </div>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  model: FormGroup;

  viewConfig: TemplateMap;

  constructor(
    private formViewTemplate: FormViewTemplateService,
    private dynamicFormBuilder: DynamicFormBuilderService
  ) {
    this.model = this.dynamicFormBuilder.getMainFormGroupModel();
    this.viewConfig = this.formViewTemplate.getTemplate();
  }

  ngOnInit(): void {}
}
