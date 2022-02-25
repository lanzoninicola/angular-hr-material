import { Injectable } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { FormState } from '../types/form-state.types';
import { FormModelBuilder } from './form-model-builder';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private _formModel: FormGroup = new FormGroup({});

  private _formControls: Map<string, FormControl> = new Map();

  private _formGroups: Map<string, FormGroup> = new Map();

  private _flatFormData: any = {};

  /**
   * Form state:
   *
   * idle
   * changed    | controller <-- form (EventEmitter)
   * submitted  | controller <-- form (EventEmitter | Submission Interceptor)
   */
  private _formState$: BehaviorSubject<FormState> =
    new BehaviorSubject<FormState>('idle');

  /**
   * @description
   * This returns an Observable that emits the value of the form
   *
   * Different from the statusChanges and ValueChanges, this prop can be used everywhere
   */
  get formState$(): BehaviorSubject<FormState> {
    return this._formState$;
  }

  /**
   * @description
   * Return an Observable that emits the status of the form
   *
   * This values MUST BE EMITTED by the Presentation Component that renders the form (Angular requirement)
   *
   * In the Presentation Component:
   *
   * @Output('statusChanges')
   * statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<Observable<any>>();
   *
   * ngOnInit(): void {
   *    this.statusChangesEvent.emit(this._dynamicForm.statusChanges$)
   * }
   */
  get formStatus$(): Observable<string> {
    return this._formModel.statusChanges.pipe(
      map((formStatus: FormControlStatus) => formStatus.toLowerCase())
    );
  }

  /**
   * @description
   * Return an Observable that emits the values of the form
   *
   * This values MUST BE EMITTED by the Presentation Component that renders the form (Angular requirement)
   *
   * In the Presentation Component:
   *
   * @Output('valueChanges')
   * valueChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<Observable<any>>();
   *
   * ngOnInit(): void {
   *   this.valueChangesEvent.emit(this._dynamicForm.formData$)
   * }
   */
  get formData$(): Observable<any> {
    return this._formModel.valueChanges.pipe(
      map((formData: { [key: string]: {} }) => {
        this._flattingFormData(formData);

        return this._flatFormData;
      }),
      tap(() => this.changed())
    );
  }

  constructor() {}

  /**
   * @description
   * Create the global form model
   *
   * @param children - {key: name of the form group, value: FormModelBuilderService}
   *
   */
  load(children: FormModelBuilder) {
    const DEFAULT_FORMGROUP_KEY = 'main';
    this._formModel.addControl(DEFAULT_FORMGROUP_KEY, children.model);
    this._getAllControls(this._formModel);
  }

  /**
   * @description
   * Merge separate dynamic form in a single model.
   *
   * This allows to control the status of multiple from
   * in a single global form and allows to manage
   * the template of the two forms separately inside the component.
   *
   * @param childrens A collection of form created with the FormModelBuilderService.
   * The key for each child is the name under which it is registered.
   *
   * children = { key: name of the form group, value: FormModelBuilderService }
   *
   */
  mergeAll(childrens: { [key: string]: FormModelBuilder }[]) {
    childrens.forEach((children) => {
      const [formGroupName] = Object.keys(children);
      this._formModel.addControl(formGroupName, children[formGroupName].model);
    });
    this._getAllControls(this._formModel);
  }

  /**
   * @description
   * Returns the 'FormGroup' object given a form group name
   *
   * @param name The key of FormGroup
   * @returns FormGroup object
   */
  findFormGroupByName(name: string): FormGroup {
    if (!this._formGroups.has(name)) {
      throw new Error(`FormGroup with name ${name} not found`);
    }

    return this._formGroups.get(name) as FormGroup;
  }

  /**
   * @description
   * Returns the 'FormControl' object given a form control name
   *
   * @param name The key of FormControl
   * @returns FormControl object
   */
  findFormControlByName(name: string): FormControl {
    if (!this._formControls.has(name)) {
      throw new Error(
        `FormControl with name ${name} not found. Current form controls: ${Array.from(
          this._formControls.keys()
        )}`
      );
    }

    return this._formControls.get(name) as FormControl;
  }

  /**
   * @description
   * Set the initial value of FormControl
   *
   * @param controlsValues - It is an object of all FormControls
   *
   * {
   *    FormControlKey1: value,
   *    FormControlKey2: value
   * }
   */
  setControlsValue(controlsValues: { [key: string]: any }) {
    const { _formModel } = this;

    if (!_formModel || _formModel === null) {
      throw 'DynamicFormService - setControlValue - The form model is not loaded yet. You cannot set the values of the form controls.';
    }

    Object.keys(controlsValues).forEach((key) => {
      this.findFormControlByName(key).setValue(controlsValues[key]);
    });
  }

  /**
   * @description Change the form state to 'idle'
   */
  idle() {
    const IDLE: FormState = 'idle';
    this._formState$.next(IDLE);
  }

  /**
   * @description Change the form state to 'changed'
   */
  changed() {
    const CHANGED: FormState = 'changed';
    this._formState$.next(CHANGED);
  }

  /**
   * @description Change the form state to 'submitted'
   */
  submitted() {
    const SUBMITTED: FormState = 'submitted';
    this._formState$.next(SUBMITTED);
  }

  /**
   * @description Reset the view and model to blank
   */
  destroy() {
    this._formModel = new FormGroup({});
    this._formControls.clear();
    this._formGroups.clear();
  }

  /**
   * @description
   * Utility function to flatten the form data
   *
   * @param obj
   */
  private _flattingFormData(obj: any) {
    Object.keys(obj).forEach((key) => {
      const isFormControl = this._formControls.has(key);
      const isFormGroup = this._formGroups.has(key);

      if (isFormControl) {
        this._flatFormData = { ...this._flatFormData, ...{ [key]: obj[key] } };
      }

      if (typeof obj[key] === 'object' && obj[key] !== null && isFormGroup) {
        this._flattingFormData(obj[key]);
      }
    });
  }

  /**
   * @description
   * This method is used to get all the controls of the form
   * and store them in a Map (FormGroups && FormControls)
   *
   * @param formGroup
   */
  private _getAllControls(model: FormGroup) {
    const { controls } = model as FormGroup;

    Object.keys(controls).forEach((key) => {
      if (controls[key] instanceof FormControl) {
        this._formControls.set(key, controls[key] as FormControl);
      }

      if (controls[key] instanceof FormGroup) {
        this._formGroups.set(key, controls[key] as FormGroup);

        this._getAllControls(controls[key] as FormGroup);
      }
    });
  }
}
