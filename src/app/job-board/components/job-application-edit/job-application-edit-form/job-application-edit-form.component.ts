import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';

@Component({
  selector: 'ahr-job-application-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class JobApplicationEditFormComponent implements OnInit {
  @Input()
  currentApplication: JobApplicationModel;

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
  statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  JA_MAIN_INFO: FormControlConfig[] = [];
  JA_JOB_INFO: FormControlConfig[] = [];

  form: FormModelBuilder;

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService
  ) {}

  ngOnInit(): void {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;

    this.form = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForms();

    if (this.entityState === 'create') {
      this._initFormValuesEntityCreate();
    }

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
    this.sub.unsubscribe();
  }

  private _setFormControlsConfig() {
    this.JA_MAIN_INFO = [
      {
        type: 'select',
        key: 'status',
        label: 'Application Status',
        placeholder: '',
        whatToSelect: 'Status',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['workingStatus'])
        ),
        syncValidators: [Validators.required],
        showOptionDescription: true,
      },
    ];

    this.JA_JOB_INFO = [
      {
        type: 'input',
        placeholder: '',
        label: 'id',
        key: 'id',
        readonly: true,
        hidden: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Title',
        key: 'title',
        readonly: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Department',
        key: 'department',
        readonly: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Role',
        key: 'jobRole',
        readonly: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Role Level',
        key: 'roleLevel',
        readonly: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Requester',
        key: 'requester',
        readonly: true,
      },
    ];
  }

  private _setupForm() {
    const { form } = this;

    form.setup({ key: 'jaMainInfo', title: 'Main' }, this.JA_MAIN_INFO);

    form.setup(
      { key: 'jaJobInfo', title: 'JobId Information' },
      this.JA_JOB_INFO
    );
  }

  private _handleForms() {
    this._dynamicForm.load(this.form);
  }

  private _initFormValuesEntityUpdate() {
    const { currentApplication } = this;
    console.log(currentApplication);

    this._dynamicForm.setControlsValue({
      id: currentApplication.id,
      status: currentApplication.status.status,
      title: currentApplication.jobId.getTitle(),
      department: currentApplication.jobId.getDepartment().getName(),
      jobRole: currentApplication.jobId.getJobRole().getName(),
      roleLevel: currentApplication.jobId.getRoleLevel().getValue(),
      requester: currentApplication.jobId.getRequester().fullname,
    });
  }

  private _initFormValuesEntityCreate() {}
}
