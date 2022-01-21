import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PicklistService } from 'src/app/core/services/picklist.service';
import { PicklistValues } from 'src/app/core/types/picklist.type';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';
import { FormControlConfiguration } from '../../types/dynamic-form.types';

@Component({
  selector: 'ahr-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit, OnDestroy {
  controlConfig: FormControlConfiguration;
  parentGroupName: string;

  control: AbstractControl;
  parentFormGroupModel: FormGroup;

  private _picklistSubscription$: Subscription;

  selectOptions$: BehaviorSubject<PicklistValues | any[]> = new BehaviorSubject<
    PicklistValues | any[]
  >([]);

  constructor(
    private dynamicFormBuilder: DynamicFormBuilderService,
    private picklist: PicklistService
  ) {}

  ngOnInit(): void {
    this.parentFormGroupModel = this.dynamicFormBuilder.getFormGroup(
      this.parentGroupName
    );
    this.control =
      this.parentFormGroupModel.controls[this.controlConfig['key']];

    this._options();
  }

  private _options() {
    const templateOptions: [] = this.controlConfig['selectOptions'];
    if (templateOptions?.length === 0) {
      this._getFromPicklist();
      return;
    }

    this.selectOptions$.next(templateOptions);
  }

  private _getFromPicklist() {
    this._picklistSubscription$ = this.picklist
      .getValuesOf(this.controlConfig['key'])
      .subscribe((pv: PicklistValues) => this.selectOptions$.next(pv));
  }

  ngOnDestroy() {
    this._picklistSubscription$.unsubscribe();
  }
}

// controlConfig['key']

// TODO: build an interface DynamicFormControl (confg, parentFormGroupModel props)
// TODO: build an interface for SELECT view config
