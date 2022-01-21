import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormBuilderService } from 'src/app/dynamic-form/services/dynamic-form-builder.service';
import { FormViewTemplateService } from 'src/app/dynamic-form/services/form-view-template.service';

import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formViewTemplate: FormViewTemplateService,
    private dynamicFormBuilder: DynamicFormBuilderService
  ) {
    this.formViewTemplate.addGroup(
      { key: 'personalInfo', title: 'Personal Information' },
      [
        {
          type: 'input',
          placeholder: '',
          label: 'Lastname',
          key: 'lastname',
          value: '',
          syncValidators: [],
        },
        {
          type: 'input',
          placeholder: '',
          label: 'Firstname',
          key: 'firstname',
          value: '',
          syncValidators: [],
        },
        {
          parentGroupName: 'personalInfo',
          type: 'input',
          placeholder: '',
          label: 'E-mail',
          key: 'email',
          value: '',
          syncValidators: [],
        },
      ]
    );

    this.formViewTemplate.addGroup(
      { key: 'companyRoleInfo', title: 'Company Role Information' },
      [
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
      ]
    );

    this.formViewTemplate.addGroup(
      { key: 'platformInfo', title: 'Platform related information' },
      [
        {
          key: 'platformRoles',
          type: 'select',
          label: 'Role',
          placeholder: '',
          whatToSelect: 'role',
          selectOptions: [] as string[],
        },
      ]
    );

    this.userEditForm = this.dynamicFormBuilder.buildModel();
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
    this.userEditForm.valueChanges.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.dynamicFormBuilder.destroy();
    this.formViewTemplate.destroy();
  }
}
