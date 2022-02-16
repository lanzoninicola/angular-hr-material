import { Injectable } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { FormGroupKey } from '../types/form-group.types';
import { FormState } from '../types/form-state.types';
import { FormModelBuilderService } from './form-model-builder.service';
import { FormViewBuilderService } from './form-view-builder.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  formModel: FormGroup = new FormGroup({});

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
    return this._getFormStatus();
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
    return this._getFormData();
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
   * Set the initial value of FormControl
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
   *
   */
  setControlsValue(group: FormGroupKey, controls: { [key: string]: any }) {
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
    this.view.destroy();
    this.model.destroy();
  }

  /**
   * @description This returns an Observable that emits the value of Change status of control
   * This value will be emit as @Output() of the Presentation Component that renders the form
   *
   * @see FormControlStatus
   *
   * @returns
   */
  private _getFormStatus(): Observable<string> {
    return this.formModel.statusChanges.pipe(
      map((formStatus: FormControlStatus) => formStatus.toLowerCase())
    );
  }

  /**
   *
   * @description
   * A multicasting observable that emits an event every time
   * the value of the control changes, in the UI or programmatically.
   *
   * @return an Observable that emits the values of the form
   */
  private _getFormData(): Observable<any> {
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
      tap(() => this.changed())
    );
  }
}
