import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { DynamicFormService } from '../../services/dynamic-form.service';
import {
  SelectConfig,
  SelectOptionConfig,
} from '../../types/form-control.types';

@Component({
  selector: 'ahr-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit, OnDestroy {
  controlConfig: SelectConfig;
  parentGroupName: string;

  control: AbstractControl;
  parentFormGroupModel: FormGroup;

  selectOptions$: Observable<SelectOptionConfig[]>;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this._dynamicForm.findFormGroupByName(
      this.parentGroupName
    );
    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];

    this._loadOptions();
  }

  objectComparisonFunction(option: any, value: any) {
    return value ? option.id === value.id : false;
  }

  private _loadOptions() {
    this.selectOptions$ =
      this.controlConfig['options'] || of([] as SelectOptionConfig[]);
  }

  ngOnDestroy() {}
}

// controlConfig['key']

// TODO: build an interface DynamicFormControl (confg, parentFormGroupModel props)
// TODO: build an interface for SELECT view config
