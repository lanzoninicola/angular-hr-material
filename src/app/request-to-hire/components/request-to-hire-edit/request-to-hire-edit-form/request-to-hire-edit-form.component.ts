import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DateService } from 'src/app/core/services/date.service';
import { PicklistService } from 'src/app/core/services/picklist.service';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { FormViewTemplate } from 'src/app/dynamic-form/types/template.types';
import { RequestToHireModel } from 'src/app/request-to-hire/models/request-to-hire.model';
import { RequestToHireStoreService } from 'src/app/request-to-hire/services/request-to-hire-store.service';

@Component({
  selector: 'app-request-to-hire-edit-form',
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
  @Input('requestToHire')
  requestToHire: RequestToHireModel;

  @Input()
  showSpinner: boolean = false;

  RTH_POSITION_MAIN: FormControlConfig[] = [];
  RTH_MAIN_INFO: FormControlConfig[] = [];
  RTH_POSITION_DETAILS: FormControlConfig[] = [];
  RTH_POSITION_OTHER: FormControlConfig[] = [];

  @Output('formState')
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

  requestToHireEditForm: FormGroup;
  requestToHireEditFormView: FormViewTemplate;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _store: RequestToHireStoreService,
    private _dateService: DateService,
    private _picklistService: PicklistService
  ) {}

  ngOnInit(): void {
    this._buildFormGroups();
    this._buildForm();
    this._setTemplatePropertyBinding();
    this._initFormValues(this.requestToHire);

    this.formStateEvent.emit(this._dynamicForm.formState$);
    this.valueChangesEvent.emit(this._dynamicForm.valueChanges$);
    this.statusChangesEvent.emit(this._dynamicForm.statusChanges$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _buildFormGroups() {
    const departmentsSelectOptions = this._store.getDepartmentsFormControl();
    const branchesSelectOptions = this._store.getBranchesFormControl();

    this.RTH_MAIN_INFO = [
      {
        type: 'input',
        placeholder: '',
        label: 'Title',
        key: 'title',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Requester',
        key: 'requester',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Created At',
        key: 'createdAt',
        initialValue: '',
        syncValidators: [],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Last Updated At',
        key: 'updatedAt',
        initialValue: '',
        syncValidators: [],
      },
      {
        key: 'status',
        type: 'select',
        label: 'Working Status',
        placeholder: '',
        whatToSelect: 'status',
        initialValue: '',
        picklistType: 'rthWorkingStatus',
      },
      {
        key: 'highPriority',
        type: 'checkbox',
        label: 'High Priority',
        initialValue: false,
      },
    ];

    this.RTH_POSITION_MAIN = [
      {
        type: 'input',
        placeholder: '',
        label: 'Budget',
        key: 'budget',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Job Role',
        key: 'jobRole',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        key: 'department',
        type: 'select',
        label: 'Department',
        placeholder: '',
        whatToSelect: 'department',
        initialValue: '',
        options: departmentsSelectOptions,
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Business Unit',
        key: 'businessUnit',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Employment Status',
        key: 'employmentStatus',
        initialValue: '',
        syncValidators: [Validators.required],
      },
    ];

    this.RTH_POSITION_DETAILS = [
      {
        type: 'textarea',
        placeholder: '',
        label: 'Tasks Description',
        key: 'roleTaskDescription',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Minimum Qualifications',
        key: 'minimumQualifications',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Preferred Qualifications',
        key: 'preferredQualifications',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Role Level',
        key: 'roleLevel',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        type: 'input',
        placeholder: '',
        label: 'Location Type',
        key: 'jobLocationType',
        initialValue: '',
        syncValidators: [Validators.required],
      },
      {
        key: 'jobLocation',
        type: 'select',
        label: 'Location',
        placeholder: '',
        whatToSelect: 'branches',
        initialValue: '',
        options: branchesSelectOptions,
      },

      {
        type: 'textarea',
        placeholder: '',
        label: 'Benefits',
        key: 'benefits',
        initialValue: '',
        syncValidators: [Validators.required],
      },
    ];

    this.RTH_POSITION_OTHER = [
      {
        key: 'specialCategoriesOpened',
        type: 'select',
        label: 'Open for Special Categories',
        placeholder: '',
        whatToSelect: '',
        initialValue: '',
        picklistType: 'yesno',
      },
      {
        type: 'textarea',
        placeholder: '',
        label: 'Additional Notes',
        key: 'additionalNotes',
        initialValue: '',
        syncValidators: [Validators.required],
      },
    ];
  }

  private _buildForm() {
    this._dynamicForm.view.build(
      { key: 'rthMainInfo', title: 'Main Information' },
      this.RTH_MAIN_INFO
    );

    this._dynamicForm.view.build(
      { key: 'rthPositionMainInfo', title: 'Position Main Information' },
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

    this._dynamicForm.model.build(this._dynamicForm.view.get());

    this._dynamicForm.load();
  }

  private _setTemplatePropertyBinding() {
    this.requestToHireEditForm = this._dynamicForm.model.get();
    this.requestToHireEditFormView = this._dynamicForm.view.get();
  }

  private _initFormValues(requestToHire: RequestToHireModel) {
    if (!requestToHire || Object.keys(requestToHire).length === 0) {
      return;
    }

    this._dynamicForm.setControlsValue('rthMainInfo', {
      title: requestToHire.getTitle(),
      requester: requestToHire.getRequester().fullname,
      createdAt: this._dateService.getDate(requestToHire.getCreatedAt()),
      updatedAt: this._dateService.getDate(requestToHire.getUpdatedAt()),
      status: requestToHire.getStatus(),
      highPriority: requestToHire.getHighPriority(),
    });

    this._dynamicForm.setControlsValue('rthPositionMainInfo', {
      budget: requestToHire.getBudget(),
      jobRole: requestToHire.getJobRole().getName(),
      department: requestToHire.getDepartment().getId(),
      businessUnit: requestToHire.getBusinessUnit(),
      employmentStatus: requestToHire.getEmploymentStatus(),
    });

    this._dynamicForm.setControlsValue('rthPositionDetails', {
      roleTaskDescription: requestToHire.getRoleTaskDescription(),
      minimumQualifications: requestToHire.getMinimumQualifications(),
      preferredQualifications: requestToHire.getPreferredQualifications(),
      roleLevel: requestToHire.getRoleLevel(),
      jobLocationType: requestToHire.getJobLocationType(),
      jobLocation: requestToHire.getJobLocation().getId(),
      benefits: requestToHire.getBenefits(),
    });

    this._dynamicForm.setControlsValue('rthPositionOther', {
      specialCategoriesOpened: 9, //requestToHire.getSpecialCategoriesOpened(),
      additionalNotes: requestToHire.getAdditionalNotes(),
    });
  }
}
