import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import {
  FormControlConfig,
  SelectOptionConfig,
} from 'src/app/dynamic-form/types/form-control.types';
import { FormViewTemplate } from 'src/app/dynamic-form/types/template.types';
import { RequestToHireService } from 'src/app/request-to-hire/services/request-to-hire.service';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';

//TODO: task description / minimum qualification / preferred qualification can be retrieve from the job roles as template
//TODO: validation between location type and location

@Component({
  selector: 'ahr-request-to-hire-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="requestToHireEditForm"
      [view]="requestToHireEditFormView"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  styleUrls: ['./request-to-hire-edit-form.component.scss'],
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

  requestToHireEditForm: FormGroup;
  requestToHireEditFormView: FormViewTemplate;

  constructor(
    private _route: ActivatedRoute,
    private _dynamicForm: DynamicFormService,
    private _dataService: RequestToHireService
  ) {}

  ngOnInit(): void {
    this._setFormControlsConfig();
    this._buildView();
    this._buildModel();
    this._setTemplatePropertyBinding();

    if (this._dataService.store.entityState === 'create') {
      this._initFormValuesEntityCreate();
    }

    if (this._dataService.store.entityState === 'update') {
      this._initFormValuesEntityUpdate();
    }

    this.valueChangesEvent.emit(this._dynamicForm.formData$);
    this.statusChangesEvent.emit(this._dynamicForm.formStatus$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
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

  private _buildView() {
    this._dynamicForm.view.build(
      { key: 'rthMainInfo', title: 'Main Information' },
      this.RTH_MAIN_INFO
    );

    this._dynamicForm.view.build(
      { key: 'rthPositionMainInfo', title: 'Position Information' },
      this.RTH_POSITION_MAIN
    );

    this._dynamicForm.view.build(
      { key: 'rthPositionDetails', title: 'Position Details' },
      this.RTH_POSITION_DETAILS
    );

    this._dynamicForm.view.build(
      { key: 'rthPositionOther', title: 'Additional Information' },
      this.RTH_POSITION_OTHER
    );
  }

  private _buildModel() {
    this._dynamicForm.model.build(this._dynamicForm.view.get());

    this._dynamicForm.load();
  }

  private _setTemplatePropertyBinding() {
    this.requestToHireEditForm = this._dynamicForm.model.get();
    this.requestToHireEditFormView = this._dynamicForm.view.get();
  }

  private _initFormValuesEntityUpdate() {
    const currentRequest = this._dataService.store.currentRequest;

    this._dynamicForm.setControlsValue('rthMainInfo', {
      id: currentRequest.getId(),
      title: currentRequest.getTitle(),
      requester: currentRequest.getRequester(),
      createdAt: currentRequest.getCreatedAt(),
      updatedAt: currentRequest.getUpdatedAt(),
      status: currentRequest.getStatus(),
      highPriority: currentRequest.getHighPriority(),
    });

    this._dynamicForm.setControlsValue('rthPositionMainInfo', {
      budget: currentRequest.getBudget(),
      jobRole: currentRequest.getJobRole(),
      roleLevel: currentRequest.getRoleLevel(),
      department: currentRequest.getDepartment(),
      businessUnit: currentRequest.getBusinessUnit(),
      employmentStatus: currentRequest.getEmploymentStatus(),
      jobLocationType: currentRequest.getJobLocationType(),
      jobLocation: currentRequest.getJobLocation(),
    });

    this._dynamicForm.setControlsValue('rthPositionDetails', {
      roleTaskDescription: currentRequest.getRoleTaskDescription(),
      minimumQualifications: currentRequest.getMinimumQualifications(),
      preferredQualifications: currentRequest.getPreferredQualifications(),

      benefits: currentRequest.getBenefits(),
    });

    this._dynamicForm.setControlsValue('rthPositionOther', {
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

        this._dynamicForm.setControlsValue('rthMainInfo', {
          status: picklistWorkingStatusNew,
        });
      });
  }
}
