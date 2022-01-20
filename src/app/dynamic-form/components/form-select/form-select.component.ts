import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PicklistService } from 'src/app/core/services/picklist.service';
import { PicklistValues } from 'src/app/core/types/picklist.type';

import { DynamicFormBuilderService } from '../../services/dynamic-form-builder.service';

@Component({
  selector: 'ahr-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit, OnDestroy {
  viewTemplateConfig: { [key: string]: any } = {};

  parentFormGroup: FormGroup;

  private _picklistSubscription$: Subscription;

  selectOptions$: BehaviorSubject<PicklistValues | any[]> = new BehaviorSubject<
    PicklistValues | any[]
  >([]);

  constructor(
    private dfb: DynamicFormBuilderService,
    private picklist: PicklistService
  ) {}

  ngOnInit(): void {
    this.parentFormGroup = this.dfb.getFormGroup(
      this.viewTemplateConfig['parentGroupName']
    );

    this._options();
  }

  private _options() {
    const templateOptions: [] = this.viewTemplateConfig['selectOptions'];
    if (templateOptions?.length === 0) {
      this._getFromPicklist();
      return;
    }

    this.selectOptions$.next(templateOptions);
  }

  private _getFromPicklist() {
    this._picklistSubscription$ = this.picklist
      .getValuesOf(this.viewTemplateConfig['key'])
      .subscribe((pv: PicklistValues) => this.selectOptions$.next(pv));
  }

  ngOnDestroy() {
    this._picklistSubscription$.unsubscribe();
  }
}

// viewTemplateConfig['key']

// TODO: build an interface DynamicFormControl (confg, parentFormGroup props)
// TODO: build an interface for SELECT view config
