import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilder } from 'src/app/dynamic-form/services/form-model-builder';
import {
  FormControlConfig,
  SelectOptionConfig,
} from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { JobIdModel } from 'src/app/job-board/models/jobid.model';

@Component({
  selector: 'ahr-jobid-edit-form-main',
  template: `
    <ahr-dynamic-form
      [model]="form.model"
      [settings]="form.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  providers: [DynamicFormService],
})
export class JobidEditFormMainComponent implements OnInit {
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

  RTH_RELATIONS_INFO: FormControlConfig[] = [];
  RTH_MAIN_INFO: FormControlConfig[] = [];
  RTH_POSITION_MAIN: FormControlConfig[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService
  ) {}

  ngOnInit(): void {
    const { formState$, formData$, formStatus$ } = this._dynamicForm;

    this.form = new FormModelBuilder();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForm();

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
    this.RTH_RELATIONS_INFO = [];

    this.RTH_MAIN_INFO = [
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
        syncValidators: [Validators.required],
      },
      {
        key: 'requester',
        type: 'select',
        label: 'Requester',
        placeholder: '',
        whatToSelect: 'requester',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['requester'])
        ),
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Created At',
        key: 'createdAt',
        syncValidators: [],
        hidden: true,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Last Updated At',
        key: 'updatedAt',
        syncValidators: [],
        readonly: true,
        hidden: true,
      },
      {
        key: 'status',
        type: 'select',
        label: 'Working Status',
        placeholder: '',
        whatToSelect: 'status',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['picklist']['workingStatus'])
        ),
      },
    ];

    this.RTH_POSITION_MAIN = [
      {
        type: 'select',
        key: 'jobRole',
        label: 'Job Role',
        placeholder: '',
        whatToSelect: 'Job Role',
        syncValidators: [Validators.required],
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['jobRoles'])
        ),
      },
      {
        type: 'select',
        key: 'roleLevel',
        label: 'Role Level',
        placeholder: '',
        whatToSelect: 'Role Level',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['picklist']['roleLevel'])
        ),
        syncValidators: [Validators.required],
      },
      {
        key: 'department',
        type: 'select',
        label: 'Department',
        placeholder: '',
        whatToSelect: 'department',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['departments'])
        ),
        syncValidators: [Validators.required],
      },
      {
        type: 'select',
        key: 'businessUnit',
        label: 'Business Unit',
        placeholder: '',
        whatToSelect: 'Business Unit',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['picklist']['businessUnit'])
        ),
        syncValidators: [Validators.required],
      },
      {
        type: 'select',
        key: 'employmentStatus',
        label: 'Employment Status',
        placeholder: '',
        whatToSelect: 'Employment Status',
        options: this._route.data.pipe(
          map(
            (data) => data['formControlsData']['picklist']['employmentStatus']
          )
        ),
        syncValidators: [Validators.required],
      },
      {
        type: 'select',
        key: 'jobLocationType',
        label: 'Location Type',
        placeholder: '',
        whatToSelect: 'Location Type',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['picklist']['jobLocationType'])
        ),
        syncValidators: [Validators.required],
      },

      {
        key: 'jobLocation',
        type: 'select',
        label: 'Branch Office',
        placeholder: '',
        whatToSelect: 'branches',
        options: this._route.data.pipe(
          map((data) => data['formControlsData']['branches'])
        ),
        syncValidators: [Validators.required],
      },
      {
        key: 'specialCategoriesOpened',
        type: 'checkbox',
        label: 'Open for Special Categories',
      },
    ];
  }

  private _setupForm() {
    const { form } = this;

    form.setup(
      { key: 'jbMainInfo', title: 'Main Information' },
      this.RTH_MAIN_INFO
    );

    form.setup(
      { key: 'jbPositionMainInfo', title: 'Position Information' },
      this.RTH_POSITION_MAIN
    );
  }

  private _handleForm() {
    this._dynamicForm.load(this.form);
  }

  private _initFormValuesEntityUpdate() {
    const { currentJobId } = this;

    this._dynamicForm.setControlsValue({
      id: currentJobId.getId(),
      title: currentJobId.getTitle(),
      createdAt: currentJobId.getCreatedAt(),
      updatedAt: currentJobId.getUpdatedAt(),
      status: currentJobId.getStatus(),
      jobRole: currentJobId.getJobRole(),
      roleLevel: currentJobId.getRoleLevel(),
      employmentStatus: currentJobId.getEmploymentStatus(),
      jobLocationType: currentJobId.getJobLocationType(),
      jobLocation: currentJobId.getJobLocation(),
      specialCategoriesOpened: currentJobId.getSpecialCategoriesOpened(),
    });
  }

  private _initFormValuesEntityCreate() {
    this._initWorkingStatusFormControl();
  }

  private _initWorkingStatusFormControl() {
    this._route.data
      .pipe(
        map<Data, SelectOptionConfig>((data) => {
          const [newWorkingStatus] = data['formControlsData']['picklist'][
            'workingStatus'
          ].filter(
            (item: SelectOptionConfig) =>
              item.textContext.toLowerCase() === 'new'
          );
          return newWorkingStatus;
        })
      )
      .subscribe((data) => {
        const { value: picklistWorkingStatusNew } = data;

        this._dynamicForm.setControlsValue({
          status: picklistWorkingStatusNew,
        });
      });
  }
}
