import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';
import { FormViewTemplateService } from '../../services/form-view-template.service';
import { TemplateObjectLiteral } from '../../types/template.types';

@Component({
  selector: 'ahr-dynamic-form',
  template: `
    <form [formGroup]="formModel">
      <div *ngFor="let groupConfig of formTemplate | keyvalue">
        <ahr-dynamic-form-group [groupConfig]="groupConfig">
        </ahr-dynamic-form-group>
      </div>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  formModel: FormGroup;

  formTemplate: TemplateObjectLiteral;

  constructor(
    private formViewTemplate: FormViewTemplateService,
    private dynamicFormBuilder: DynamicFormBuilderService
  ) {
    this.formModel = this.dynamicFormBuilder.getMainFormGroupModel();
    this.formTemplate = this.formViewTemplate.getTemplate({
      format: 'literal',
    });
  }

  ngOnInit(): void {}
}
