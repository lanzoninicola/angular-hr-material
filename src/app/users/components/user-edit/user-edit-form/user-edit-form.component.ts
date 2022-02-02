import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { FormControlConfig } from 'src/app/dynamic-form/types/form-control.types';

import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { FormViewTemplate } from 'src/app/dynamic-form/types/template.types';
import { UserModel } from 'src/app/users/types/user.type';

@Component({
  selector: 'ahr-user-edit-form',
  template: `
    <ahr-dynamic-form
      [model]="userEditForm"
      [view]="userEditFormView"
      [showSpinner]="showSpinner"
    ></ahr-dynamic-form>
  `,
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  @Input('user')
  user: UserModel | null = {} as UserModel;

  @Input()
  showSpinner: boolean = false;

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

  userEditForm: FormGroup;
  userEditFormView: FormViewTemplate;

  constructor(private _dynamicForm: DynamicFormService) {}

  ngOnInit(): void {
    this._buildForm();
    this._setTemplatePropertyBinding();
    this._initFormValues(this.user);

    this.formStateEvent.emit(this._dynamicForm.formState$);
    this.valueChangesEvent.emit(this._dynamicForm.valueChanges$);
    this.statusChangesEvent.emit(this._dynamicForm.statusChanges$);
  }

  ngOnDestroy() {
    this._dynamicForm.destroy();
  }

  private _buildForm() {
    this._dynamicForm.view.build(
      { key: 'personalInfo', title: 'Personal Information' },
      PERSONAL_INFO_CONTROLS
    );

    this._dynamicForm.view.build(
      { key: 'companyRoleInfo', title: 'Company Role Information' },
      COMPANY_ROLE_INFO_CONTROLS
    );

    this._dynamicForm.view.build(
      { key: 'recruitingRole', title: 'Recruiting role' },
      RECRUITING_ROLE_CONTROLS
    );

    this._dynamicForm.model.build(this._dynamicForm.view.get());

    this._dynamicForm.load();
  }

  private _setTemplatePropertyBinding() {
    this.userEditForm = this._dynamicForm.model.get();
    this.userEditFormView = this._dynamicForm.view.get();
  }

  private _initFormValues(user: UserModel | null) {
    if (!user || Object.keys(user).length === 0) {
      return;
    }

    this._dynamicForm.setControlsValue('personalInfo', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });

    this._dynamicForm.setControlsValue('companyRoleInfo', {
      departments: user.department,
      companyLevels: user.companyRoleLevel,
    });

    this._dynamicForm.setControlsValue('recruitingRole', {
      recruitingRoles: user.recruitingRole,
      isAdmin: user.isAdmin,
    });
  }
}

// TODO: async validation to verify if the email already exists in the process of creating the userEditForm
// localhost:3000/users/?lastname=Graham
const PERSONAL_INFO_CONTROLS: FormControlConfig[] = [
  {
    type: 'input',
    placeholder: '',
    label: 'Lastname',
    key: 'lastname',
    value: '',
    syncValidators: [Validators.required],
  },
  {
    type: 'input',
    placeholder: '',
    label: 'Firstname',
    key: 'firstname',
    value: '',
    syncValidators: [Validators.required],
  },
  {
    type: 'input',
    placeholder: '',
    label: 'E-mail',
    key: 'email',
    value: '',
    syncValidators: [Validators.required, Validators.email],
  },
];

const COMPANY_ROLE_INFO_CONTROLS: FormControlConfig[] = [
  {
    key: 'departments',
    type: 'select',
    label: 'Department',
    placeholder: '',
    whatToSelect: 'department',
    value: [] as string[],
  },
  {
    key: 'companyLevels',
    type: 'select',
    label: 'Level',
    placeholder: '',
    whatToSelect: 'level',
    value: [] as string[],
  },
];

const RECRUITING_ROLE_CONTROLS: FormControlConfig[] = [
  {
    key: 'recruitingRoles',
    type: 'select',
    label: 'Role',
    placeholder: '',
    whatToSelect: 'role',
    value: [] as string[],
  },
  {
    key: 'isAdmin',
    type: 'checkbox',
    label: 'Administrator',
    value: false,
  },
];
