import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormBuilderService } from 'src/app/dynamic-form/services/dynamic-form-builder.service';

import { UserEditFormPicklist } from '../../types/user-edit-form.types';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userEditForm: FormGroup;

  formViewTemplate = {
    personalInfo: [
      {
        parentGroupName: 'personalInfo',
        controlType: 'input',
        placeholder: '',
        label: 'Lastname',
        key: 'lastname',
        value: '',
        syncValidators: [Validators.required],
      },
      {
        parentGroupName: 'personalInfo',
        controlType: 'input',
        placeholder: '',
        label: 'Firstname',
        key: 'firstname',
        value: '',
        syncValidators: [Validators.required],
      },
      {
        parentGroupName: 'personalInfo',
        controlType: 'input',
        placeholder: '',
        label: 'E-mail',
        key: 'email',
        value: '',
        syncValidators: [Validators.required, Validators.email],
      },
    ],
    companyRoleInfo: [
      {
        parentGroupName: 'companyRoleInfo',
        controlType: 'select',
        label: 'Department',
        key: 'departments',
        syncValidators: [] as Validators,
        whatToSelect: 'department',
        selectOptions: [] as string[],
      },
      {
        parentGroupName: 'companyRoleInfo',
        controlType: 'select',
        label: 'Level',
        key: 'companyLevels',
        syncValidators: [] as Validators,
        whatToSelect: 'level',
        selectOptions: [] as string[],
      },
    ],
    platformInfo: [
      {
        parentGroupName: 'platformInfo',
        controlType: 'select',
        label: 'Role',
        key: 'platformRoles',
        syncValidators: [] as Validators,
        whatToSelect: 'role',
        selectOptions: [] as string[],
      },
    ],
  };

  constructor(
    private route: ActivatedRoute,
    private dynamicFormBuilder: DynamicFormBuilderService
  ) {
    this.userEditForm = this.dynamicFormBuilder.buildModel(
      this.formViewTemplate
    );
  }

  ngOnInit(): void {
    const user = this.route.snapshot.data['userEdit'];
    this.setFormWithUserData(user);
  }

  setFormWithUserData(user: UserModel) {
    this.userEditForm
      .get(['personalInfo', 'firstname'])
      ?.setValue(user.firstname);

    this.userEditForm
      .get(['personalInfo', 'lastname'])
      ?.setValue(user.lastname);

    this.userEditForm.get(['personalInfo', 'email'])?.setValue(user.email);

    this.userEditForm
      .get(['companyRoleInfo', 'departments'])
      ?.setValue(user.department);

    this.userEditForm
      .get(['companyRoleInfo', 'companyLevels'])
      ?.setValue(user.companyRoleLevel);

    this.userEditForm
      .get(['platformInfo', 'platformRoles'])
      ?.setValue(user.platformRole);
  }

  onSave() {
    console.log(this.userEditForm);
    console.log(this.userEditForm.get(['personalInfo', 'username']).value);

    this.userEditForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }
}
