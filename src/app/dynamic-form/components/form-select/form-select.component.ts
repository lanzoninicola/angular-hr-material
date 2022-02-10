import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { PicklistService } from 'src/app/core/services/picklist.service';
import { Picklist, PicklistValue } from 'src/app/core/types/picklist.type';

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

  private _picklistSubscription$: Subscription = new Subscription();

  selectOptions$: BehaviorSubject<SelectOptionConfig[]> = new BehaviorSubject<
    SelectOptionConfig[]
  >([]);

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

    this._loadOptions();
  }

  private _loadOptions() {
    if (this.controlConfig?.picklistType) {
      this._loadFromPicklist();
    } else {
      this._loadFromControlConfig();
    }
  }

  private _loadFromControlConfig() {
    const options = this.controlConfig['options'] || [];
    this.selectOptions$.next(options);
  }

  private _loadFromPicklist() {
    const type = this.controlConfig.picklistType || '';
    this._picklistSubscription$ = this.picklist
      .findByType(type)
      .pipe(
        map((picklists: Picklist[]) => {
          return picklists.map((picklist) => {
            return {
              value: picklist.id,
              textContext: picklist.value,
            };
          });
        })
      )
      .subscribe((picklistOptions: SelectOptionConfig[]) => {
        console.log(picklistOptions);
        this.selectOptions$.next(picklistOptions);
      });
  }

  ngOnDestroy() {
    this._picklistSubscription$.unsubscribe();
  }
}

// controlConfig['key']

// TODO: build an interface DynamicFormControl (confg, parentFormGroupModel props)
// TODO: build an interface for SELECT view config
