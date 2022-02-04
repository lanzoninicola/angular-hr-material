import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';
import { UserModel } from '../../models/user.model';

import { UsersStoreService } from '../../services/user-store.service';
import { UsersService } from '../../services/users.service';
import { UserFormData } from '../../types/user-edit-form.types';

@Component({
  selector: 'ahr-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  currentUser: UserModel;
  entityState: EntityState = 'create';

  formState: FormState = 'idle';
  formStatus: string = 'invalid';

  constructor(
    private _store: UsersStoreService,
    private _usersService: UsersService
  ) {}

  ngOnInit() {
    this.entityState = this._store.get('userEdit-entityState');
    this.currentUser = this._store.get('userEdit-currentUser');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onFormState(formState: BehaviorSubject<FormState>) {
    this.subs.add(
      formState.subscribe((formState: FormState) => {
        this.formState = formState;
      })
    );
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.subs.add(
      valueChanges
        .pipe<UserModel>(
          map((userFormData: UserFormData) => {
            return new UserModel(
              this.currentUser.getId(),
              userFormData['firstname'],
              userFormData['lastname'],
              userFormData['email'],
              userFormData['recruitingRoles'],
              userFormData['departments'],
              userFormData['companyLevels'],
              userFormData['isAdmin']
            );
          })
        )
        .subscribe((userModel: UserModel) => {
          this.currentUser = userModel;
        })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.subs.add(
      statusChanges.subscribe((formStatus) => (this.formStatus = formStatus))
    );
  }

  onSaveButtonClicked() {
    if (this.entityState === 'create') {
      this._usersService.save(this.currentUser);
    }
    if (this.entityState === 'update') {
      this._usersService.update(this.currentUser);
    }
  }

  // TODO: Develop disable user
  onDisableButtonClicked() {}

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}

// TODO: check if a user with the same e-mail is already registered
