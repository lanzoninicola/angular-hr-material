import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserEditFormPicklist } from '../../types/user-edit-form.types';
import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userEditForm2 = {
    personalInfo: [
      {
        parentGroupName: 'personalInfo',
        controlType: 'input',
        placeholder: '',
        label: 'Text Input',
        key: 'username',
        value: 'This input is pre-populated',
        syncValidators: [Validators.required],
      },
      {
        parentGroupName: 'personalInfo',
        controlType: 'input',
        label: 'Password Input',
        key: 'password',
        type: 'password',
        syncValidators: [Validators.required, Validators.minLength(8)],
      },
    ],
    companyRoleInfo: [
      {
        parentGroupName: 'companyRoleInfo',
        controlType: 'select',
        label: 'Dropdown Menu',
        key: 'dropdown',
        syncValidators: [Validators.required],
        whatToSelect: 'a topic',
        selectOptions: [
          { value: 'option1' },
          { value: 'option2' },
          { value: 'option3' },
          { value: 'option4' },
        ],
      },
    ],
  };

  userEditForm = new FormGroup({
    personalInfo: new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    }),
    companyRoleInfo: new FormGroup({
      department: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    }),
    platformInfo: new FormGroup({
      role: new FormControl('', Validators.required),
    }),
  });

  formPicklistData: UserEditFormPicklist = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.formPicklistData = this.route.snapshot.data['userEditFormInit'];

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
      .get(['companyRoleInfo', 'department'])
      ?.setValue(user.department);

    this.userEditForm
      .get(['companyRoleInfo', 'level'])
      ?.setValue(user.companyRoleLevel);

    this.userEditForm
      .get(['platformInfo', 'role'])
      ?.setValue(user.platformRole);
  }

  onSave() {}
}
