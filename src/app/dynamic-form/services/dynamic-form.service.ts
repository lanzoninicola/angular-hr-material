import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from '../types/dynamic-form.types';
import { FormControlKey } from '../types/form-control.types';
import { FormGroupKey } from '../types/form-group.types';
import { FormState } from '../types/form-state.types';
import { FormViewTemplate } from '../types/template.types';
import { FormModelBuilderService } from './form-model-builder.service';
import { FormViewBuilderService } from './form-view-builder.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  formModel: FormGroup = new FormGroup({});

  formState$: BehaviorSubject<FormState> = new BehaviorSubject<FormState>(
    'idle'
  );

  get valueChanges(): Observable<any> {
    return this._getValueChanges();
  }

  constructor(
    public model: FormModelBuilderService,
    public view: FormViewBuilderService
  ) {}

  load() {
    this.formModel = this.model.get();
  }

  /**
   * @description
   * Returns the 'FormGroup' object given a form group name
   * Note: This method manages only one level of indentation
   *
   * @param name The key of FormGroup
   * @returns FormGroup object
   */
  getFormGroup(name: string): FormGroup {
    if (this.formModel.contains(name)) {
      return this.formModel.controls[name] as FormGroup;
    }

    return new FormGroup({});
  }

  /**
   * @description
   * Set the value of FormControl
   *
   *
   * @param group - The FormGroup name
   * @param controls - It is an object of all FormControls that belong to a FormGroup
   *
   * {
   *  FormControlKey1: FormControlName1,
   * FormControlKey2: FormControlName2
   * }
   *
   */
  setControlsValue(
    group: FormGroupKey,
    controls: { [key: string]: FormControlKey | undefined }
  ) {
    if (this.formModel && this.formModel !== null) {
      Object.keys(controls).forEach((key) => {
        let formControl = this.formModel!.get([group, key]);

        if (formControl && formControl !== null) {
          formControl.setValue(controls[key]);
        } else {
          throw `The FormControl '${key}' not found in the group '${group}'. Did you spell it wrong?`;
        }
      });
    }
  }

  /**
   * @description
   * Get the values of all controls of the form
   *
   */
  // getControlsValues(): { [key: FormControlKey]: string } {
  //   let formValues: { [key: string]: string } = {};

  //   for (const [controlKey, groupKey] of this.model.formKeysMap) {
  //     let controlValue = this.formModel!.get([groupKey, controlKey])!.value;
  //     formValues[controlKey] = controlValue.trim();
  //   }

  //   return formValues;
  // }

  destroy() {
    this.view.destroy();
    this.model.destroy();
  }

  /**
   *
   * @description
   * A multicasting observable that emits an event every time
   * the value of the control changes, in the UI or programmatically.
   *
   * @return the Observable contains all the values of FormModel in a flat way
   * (it is not separated by the formGroup)
   */
  private _getValueChanges(): Observable<any> {
    return this.formModel.valueChanges.pipe(
      map((formData: { [key: string]: {} }) => {
        let flatFormData = {};

        Object.values(formData).forEach(
          (formGroupData: { [key: string]: string }) => {
            flatFormData = { ...flatFormData, ...formGroupData };
          }
        );

        return flatFormData;
      }),
      tap(() => this.formState$.next('changed'))
    );
  }
}
