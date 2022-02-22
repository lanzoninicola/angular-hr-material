import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobIdModel } from 'src/app/job-board/models/job-id.model';

@Component({
  selector: 'ahr-jobid-edit-form-details',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class JobidEditFormDetailsComponent implements OnInit {
  form: FormModelBuilder;

  @Input()
  currentJobId: JobIdModel;

  @Input()
  entityState: EntityState;

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
  statusChangesEvent: EventEmitter<Observable<string>> = new EventEmitter<
    Observable<string>
  >();

  RTH_POSITION_DETAILS: FormControlConfig[] = [];

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;

    this.form = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForm();

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
    this.RTH_POSITION_DETAILS = [
      {
        type: 'textarea',
        placeholder: '',
        label: 'Tasks Description',
        key: 'roleTaskDescription',
        syncValidators: [Validators.required],
        style: {
          minHeight: '300px',
          lineHeight: '1.5',
        },
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Minimum Qualifications',
        key: 'minimumQualifications',
        syncValidators: [Validators.required],
        style: {
          minHeight: '300px',
          lineHeight: '1.5',
        },
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Preferred Qualifications',
        key: 'preferredQualifications',
        syncValidators: [Validators.required],
        style: {
          minHeight: '300px',
          lineHeight: '1.5',
        },
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Benefits',
        key: 'benefits',
        syncValidators: [Validators.required],
        style: {
          minHeight: '300px',
          lineHeight: '1.5',
        },
      },
    ];
  }

  private _setupForm() {
    const { form } = this;

    form.setup(
      { key: 'jbPositionDetails', title: 'Position Details' },
      this.RTH_POSITION_DETAILS
    );
  }

  private _handleForm() {
    this._dynamicForm.load(this.form);
  }

  private _initFormValuesEntityUpdate() {
    const { currentJobId } = this;

    this._dynamicForm.setControlsValue({
      roleTaskDescription: currentJobId.getRoleTaskDescription(),
      minimumQualifications: currentJobId.getMinimumQualifications(),
      preferredQualifications: currentJobId.getPreferredQualifications(),
      benefits: currentJobId.getBenefits(),
    });
  }
}
