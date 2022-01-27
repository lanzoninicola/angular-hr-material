import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';

import { UsersStoreService } from '../../services/user-store.service';
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
  formState$: BehaviorSubject<EntityState> = new BehaviorSubject<EntityState>(
    'create'
  );

  constructor(
    private _store: UsersStoreService,
    private _usersService: UsersService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formState$.next(this._store.get('userEdit-formState').value);
    this.currentUser$.next(this._store.get('userEdit-currentUser').value);
  }

  onSave(userFormData: UserFormData) {
    const userModel: UserModel = this._transformFormData(userFormData);

    if (this.formState$.value === 'create') {
      this._save(userModel);
    }

    if (this.formState$.value === 'update') {
      this._update(userModel);
    }
  }

  private _transformFormData(userFormData: UserFormData): UserModel {
    return {
      firstname: userFormData['firstname'],
      lastname: userFormData['lastname'],
      email: userFormData['email'],
      department: userFormData['departments'],
      companyRoleLevel: userFormData['companyLevels'],
      platformRole: userFormData['platformRoles'],
    };
  }

  private _save(user: UserModel) {
    this._usersService
      .save(user)
      .subscribe((newUser) => this._store.set('userEdit-currentUser', newUser));

    // TODO: feedback interaction during: sending request, save succesfully, error using MessageService
  }

  private _update(user: UserModel) {
    this._usersService
      .update(user)
      .subscribe((updatedUser) =>
        this._store.set('userEdit-currentUser', updatedUser)
      );
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
