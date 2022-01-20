import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from '../../services/dynamic-form.service';

@Component({
  selector: 'ahr-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit {
  viewTemplateConfig: { [key: string]: any } = {};

  parentFormGroup: FormGroup;

  constructor(private df: DynamicFormService) {}

  ngOnInit(): void {
    this.parentFormGroup = this.df.getFormGroup(
      this.viewTemplateConfig['parentGroupName']
    );
  }
}

// TODO: build an interface DynamicFormControl (confg, parentFormGroup props)
// TODO: build an interface for SELECT view config
