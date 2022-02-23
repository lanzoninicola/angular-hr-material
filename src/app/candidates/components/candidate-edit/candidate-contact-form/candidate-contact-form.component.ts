import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';
import { CandidateService } from 'src/app/candidates/services/candidate.service';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';

import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

@Component({
  selector: 'ahr-candidate-contact-form',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  styleUrls: ['./candidate-contact-form.component.scss'],
})
export class CandidateContactFormComponent implements OnInit {
  @Input()
  currentCandidate: CandidateModel;

  @Input()
  entityState: EntityState;

  @Input()
  forceReadonly: boolean = false;

  @Input()
  showSpinner: boolean = false;

  sub = new Subscription();

  @Output('formStateChanges')
  formStateEvent: EventEmitter<BehaviorSubject<FormState>> = new EventEmitter<
    BehaviorSubject<FormState>
  >();

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  CONTACT_DETAILS_CONTROLS: FormControlConfig[] = [];

  form: FormModelBuilder;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;

    this.form = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForms();

    if (this.entityState === 'update') {
      this._initFormValuesEntityUpdate();
    }

    this.sub.add(
      formState$.subscribe(() => this.formStateEvent.emit(formState$))
    );
    this.valueChangesEvent.emit(formData$);
    this.statusChangesEvent.emit(formStatus$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _setFormControlsConfig() {
    this.CONTACT_DETAILS_CONTROLS = [
      {
        type: 'input',
        placeholder: '',
        label: 'Lastname',
        key: 'lastname',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Firstname',
        key: 'firstname',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'E-mail',
        key: 'email',
        syncValidators: [Validators.required, Validators.email],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Primary Phone',
        key: 'phoneNumber',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Address',
        key: 'address',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'City',
        key: 'city',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'State',
        key: 'state',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Zip Code',
        key: 'zipCode',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Country',
        key: 'country',
        syncValidators: [Validators.required],
        readonly: this.forceReadonly,
      },
    ];
  }

  private _setupForm() {
    const { form } = this;

    form.setup(
      { key: 'jbMainInfo', title: 'Contact Details' },
      this.CONTACT_DETAILS_CONTROLS
    );
  }

  private _handleForms() {
    const { form } = this;

    this._dynamicForm.load(form);
  }

  private _initFormValuesEntityUpdate() {
    const { currentCandidate } = this;

    this._dynamicForm.setControlsValue({
      firstname: currentCandidate.getFirstname(),
      lastname: currentCandidate.getLastname(),
      email: currentCandidate.getEmail(),
      phoneNumber: currentCandidate.getPhoneNumber(),
      address: currentCandidate.getAddress(),
      city: currentCandidate.getCity(),
      state: currentCandidate.getState(),
      zipCode: currentCandidate.getZipCode(),
      country: currentCandidate.getCountry(),
    });
  }
}

// TODO: async validation to verify if the email already exists in the process of creating the candidateEditForm
// localhost:3000/candidates/?lastname=Graham
