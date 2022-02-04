import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PicklistService } from 'src/app/core/services/picklist.service';
import { PicklistValue } from 'src/app/core/types/picklist.type';

import { DynamicFormService } from '../../services/dynamic-form.service';
import { SelectConfig } from '../../types/form-control.types';

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

  private _picklistSubscription$: Subscription;

  selectOptions$: BehaviorSubject<PicklistValue[] | any[]> =
    new BehaviorSubject<PicklistValue[] | any[]>([]);

  constructor(
    private _dynamicForm: DynamicFormService,
    private picklist: PicklistService
  ) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this._dynamicForm.getFormGroup(
      this.parentGroupName
    );
    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];

    this._options();
  }

  private _options() {
    const templateOptions: string[] = this.controlConfig['value'] as string[];
    if (templateOptions.length === 0) {
      this._getFromPicklist();
      return;
    }

    this.selectOptions$.next(templateOptions);
  }

  private _getFromPicklist() {
    this._picklistSubscription$ = this.picklist
      .getValuesOf(this.controlConfig['key'])
      .subscribe((pv: PicklistValue[]) => this.selectOptions$.next(pv));
  }

  ngOnDestroy() {
    this._picklistSubscription$.unsubscribe();
  }
}

// controlConfig['key']

// TODO: build an interface DynamicFormControl (confg, parentFormGroupModel props)
// TODO: build an interface for SELECT view config
