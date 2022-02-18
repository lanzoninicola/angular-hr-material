import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormModelBuilderService } from 'src/app/dynamic-form/services/form-model-builder.service';
import {
  FormControlConfig,
  SelectOptionConfig,
} from 'src/app/dynamic-form/types/form-control.types';

import { RequestToHireService } from 'src/app/request-to-hire/services/request-to-hire.service';

//TODO: task description / minimum qualification / preferred qualification can be retrieve from the job roles as template
//TODO: validation between location type and location

@Component({
  selector: 'ahr-request-to-hire-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="requestToHireEditForm.model"
      [settings]="requestToHireEditForm.settings"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
})
export class RequestToHireEditFormComponent implements OnInit {
  @Input()
  showSpinner: boolean = false;

  @Output('valueChanges')
  valueChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  @Output('statusChanges')
  statusChangesEvent: EventEmitter<Observable<any>> = new EventEmitter<
    Observable<any>
  >();

  RTH_POSITION_MAIN: FormControlConfig[] = [];
  RTH_MAIN_INFO: FormControlConfig[] = [];
  RTH_POSITION_DETAILS: FormControlConfig[] = [];
  RTH_POSITION_OTHER: FormControlConfig[] = [];

  requestToHireEditForm: FormModelBuilderService;

  constructor(
    private _route: ActivatedRoute,
    private _dynamicFormService: DynamicFormService,
    private _dataService: RequestToHireService
  ) {}

  ngOnInit(): void {
    this.requestToHireEditForm = new FormModelBuilderService();
    this._setFormControlsConfig();
    this._setupForm();
    this._handleForm();

    if (this._dataService.store.entityState === 'create') {
      this._initFormValuesEntityCreate();
    }

    if (this._dataService.store.entityState === 'update') {
      this._initFormValuesEntityUpdate();
    }

    this.valueChangesEvent.emit(this._dynamicFormService.formData$);
    this.statusChangesEvent.emit(this._dynamicFormService.formStatus$);
  }

  ngOnDestroy() {
    this._dynamicFormService.destroy();
  }

  private _setFormControlsConfig() {
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
      {
        key: 'highPriority',
        type: 'checkbox',
        label: 'High Priority',
        readonly: true,
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
        type: 'input',
        placeholder: '1500-2000',
        label: 'Budget',
        key: 'budget',
        syncValidators: [Validators.required],
      },
    ];

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

    this.RTH_POSITION_OTHER = [
      {
        key: 'specialCategoriesOpened',
        type: 'checkbox',
        label: 'Open for Special Categories',
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Additional Notes',
        key: 'additionalNotes',
      },
    ];
  }

  private _setupForm() {
    const { requestToHireEditForm } = this;

    requestToHireEditForm.setup(
      { key: 'rthMainInfo', title: 'Main Information' },
      this.RTH_MAIN_INFO
    );

    requestToHireEditForm.setup(
      { key: 'rthPositionMainInfo', title: 'Position Information' },
      this.RTH_POSITION_MAIN
    );

    requestToHireEditForm.setup(
      { key: 'rthPositionDetails', title: 'Position Details' },
      this.RTH_POSITION_DETAILS
    );

    requestToHireEditForm.setup(
      { key: 'rthPositionOther', title: 'Additional Information' },
      this.RTH_POSITION_OTHER
    );
  }

  private _handleForm() {
    const { requestToHireEditForm } = this;

    this._dynamicFormService.load(requestToHireEditForm);
  }

  private _initFormValuesEntityUpdate() {
    const { currentRequest } = this._dataService.store;

    this._dynamicFormService.setControlsValue({
      id: currentRequest.getId(),
      title: currentRequest.getTitle(),
      requester: currentRequest.getRequester(),
      createdAt: currentRequest.getCreatedAt(),
      updatedAt: currentRequest.getUpdatedAt(),
      status: currentRequest.getStatus(),
      highPriority: currentRequest.getHighPriority(),
      budget: currentRequest.getBudget(),
      jobRole: currentRequest.getJobRole(),
      roleLevel: currentRequest.getRoleLevel(),
      department: currentRequest.getDepartment(),
      businessUnit: currentRequest.getBusinessUnit(),
      employmentStatus: currentRequest.getEmploymentStatus(),
      jobLocationType: currentRequest.getJobLocationType(),
      jobLocation: currentRequest.getJobLocation(),
      roleTaskDescription: currentRequest.getRoleTaskDescription(),
      minimumQualifications: currentRequest.getMinimumQualifications(),
      preferredQualifications: currentRequest.getPreferredQualifications(),
      benefits: currentRequest.getBenefits(),
      specialCategoriesOpened: currentRequest.getSpecialCategoriesOpened(),
      additionalNotes: currentRequest.getAdditionalNotes(),
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

        this._dynamicFormService.setControlsValue({
          status: picklistWorkingStatusNew,
        });
      });
  }
}
