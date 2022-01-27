import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { DynamicFormBuilderService } from 'src/app/dynamic-form/services/dynamic-form-builder.service';
import { FormViewTemplateService } from 'src/app/dynamic-form/services/form-view-template.service';
import { FormControlConfiguration } from 'src/app/dynamic-form/types/dynamic-form.types';
import { UserModel } from 'src/app/users/types/user.type';

@Component({
  selector: 'ahr-user-edit-form',
  template: `
    <ahr-dynamic-form></ahr-dynamic-form>
    <button type="button" (click)="onSave()">Save</button>
  `,
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  @Input('user')
  user: UserModel | null = {} as UserModel;

  @Output()
  onSaveEvent: EventEmitter<any> = new EventEmitter();

  userEditForm: FormGroup;

  constructor(
    private formViewTemplate: FormViewTemplateService,
    private dynamicFormBuilder: DynamicFormBuilderService
  ) {
    this.formViewTemplate.addGroup(
      { key: 'personalInfo', title: 'Personal Information' },
      PERSONAL_INFO_CONTROLS
    );

    this.formViewTemplate.addGroup(
      { key: 'companyRoleInfo', title: 'Company Role Information' },
      COMPANY_ROLE_INFO_CONTROLS
    );

    this.formViewTemplate.addGroup(
      { key: 'platformInfo', title: 'Platform related information' },
      PLATFORM_INFO_CONTROLS
    );

    this.userEditForm = this.dynamicFormBuilder.buildModel();
  }

  ngOnInit(): void {
    if (this.user && Object.keys(this.user).length > 0) {
      this._setFormWithUserData(this.user);
    }
  }

  ngOnDestroy() {
    this.dynamicFormBuilder.destroy();
    this.formViewTemplate.destroy();
  }

  private _setFormWithUserData(user: UserModel) {
    this.dynamicFormBuilder.setControlsValue('personalInfo', {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });

    this.dynamicFormBuilder.setControlsValue('companyRoleInfo', {
      departments: user.department,
      companyLevels: user.companyRoleLevel,
    });

    this.dynamicFormBuilder.setControlsValue('platformInfo', {
      platformRoles: user.platformRole,
    });
  }

  onSave() {
    this.onSaveEvent.emit(this.dynamicFormBuilder.getControlsValues());
  }
}

// TODO: async validation to verify if the email already exists in the process of creating the userEditForm
// localhost:3000/users/?lastname=Graham
const PERSONAL_INFO_CONTROLS: FormControlConfiguration[] = [
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

const COMPANY_ROLE_INFO_CONTROLS: FormControlConfiguration[] = [
  {
    key: 'departments',
    type: 'select',
    label: 'Department',
    placeholder: '',
    whatToSelect: 'department',
    selectOptions: [] as string[],
  },
  {
    key: 'companyLevels',
    type: 'select',
    label: 'Level',
    placeholder: '',
    whatToSelect: 'level',
    selectOptions: [] as string[],
  },
];

const PLATFORM_INFO_CONTROLS: FormControlConfiguration[] = [
  {
    key: 'platformRoles',
    type: 'select',
    label: 'Role',
    placeholder: '',
    whatToSelect: 'role',
    selectOptions: [] as string[],
  },
];
