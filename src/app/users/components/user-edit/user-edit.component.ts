import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { UsersService } from '../../services/users.service';
import { UserFormData } from '../../types/user-edit-form.types';

import { UserModel } from '../../types/user.type';

type EntityState = 'create' | 'update';
@Component({
  selector: 'ahr-user-edit',
  template: `
    <div class="container">
      <ahr-user-edit-form
        [user]="currentUser$ | async"
        (onSaveEvent)="onSave($event)"
      ></ahr-user-edit-form>
    </div>
  `,
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(
    {} as UserModel
  );
  userFormData$: BehaviorSubject<UserFormData> =
    new BehaviorSubject<UserFormData>({} as UserFormData);
  entityState: EntityState = 'create';

  constructor(
    private route: ActivatedRoute,
    private _usersService: UsersService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    console.log('userEdit init');
    const userResolved = this.route.snapshot.data['userEdit'];

    userResolved
      ? (this.entityState = 'update')
      : (this.entityState = 'create');

    if ((this.entityState = 'update')) {
      this._loadUser(userResolved);
    }
  }

  private _loadUser(user: any) {
    this.currentUser$.next(user);
  }

  onSave(userFormData: UserFormData) {
    // this.userFormData$.next(userFormData);

    const userModel: UserModel = {
      firstname: userFormData['firstname'],
      lastname: userFormData['lastname'],
      email: userFormData['email'],
      department: userFormData['departments'],
      companyRoleLevel: userFormData['companyLevels'],
      platformRole: userFormData['platformRoles'],
    };

    if (this.entityState === 'create') {
      this._save(userModel);
    }

    if (this.entityState === 'update') {
      this._update(userModel);
    }
  }

  private _save(user: UserModel) {
    this._usersService
      .save(user)
      .subscribe((newUser) => this.currentUser$.next(newUser));

    // TODO: feedback interaction during: sending request, save succesfully, error using MessageService
  }

  private _update(user: UserModel) {
    this._usersService
      .update(user)
      .subscribe((updatedUser) => this.currentUser$.next(updatedUser));
  }
}

// TODO: check if a user with the same e-mail is already registered

/*

{
        firstname: 'Nicola',
        lastname: 'Lanzoni',
        email: 'lanzoni.nicola',
        departments: '',
        companyLevels: '',
        platformRole: '',
      }

*/
