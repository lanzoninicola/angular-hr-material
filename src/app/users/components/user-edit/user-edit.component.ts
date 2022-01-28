import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { MessageService } from 'src/app/core/services/message.service';
import { FormState } from 'src/app/dynamic-form/types/form-state.types';

import { UsersStoreService } from '../../services/user-store.service';
import { UsersService } from '../../services/users.service';
import { UserFormData } from '../../types/user-edit-form.types';
import { UserModel } from '../../types/user.type';

type EntityState = 'create' | 'update';
@Component({
  selector: 'ahr-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  currentUser$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(
    {} as UserModel
  );
  entityState$: BehaviorSubject<EntityState> = new BehaviorSubject<EntityState>(
    'create'
  );
  formValues$: BehaviorSubject<UserFormData> =
    new BehaviorSubject<UserFormData>({} as UserFormData);
  formState: string;

  formStateSub: Subscription;
  valueChangesSub: Subscription;
  formValuesSub: Subscription;

  constructor(
    private _store: UsersStoreService,
    private _usersService: UsersService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    // This has been set in the resolvers class
    this.entityState$.next(this._store.get('userEdit-entityState').value);
    // This has been in the resolvers class
    this.currentUser$.next(this._store.get('userEdit-currentUser').value);
  }

  ngOnDestroy() {
    this.formStateSub.unsubscribe();
    this.valueChangesSub.unsubscribe();
    this.formValuesSub.unsubscribe();
  }

  onFormState(formState: BehaviorSubject<FormState>) {
    this.formStateSub = formState.subscribe(
      (formState: FormState) => (this.formState = formState)
    );
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.valueChangesSub = valueChanges.subscribe(
      (userFormData: UserFormData) => {
        this.formValues$.next(userFormData);
      }
    );
  }

  onSaveButtonClicked() {
    this.formValuesSub = this.formValues$
      .pipe<UserModel>(
        map((userFormData: UserFormData) => {
          return {
            id: this.currentUser$.value.id,
            firstname: userFormData['firstname'],
            lastname: userFormData['lastname'],
            email: userFormData['email'],
            department: userFormData['departments'],
            companyRoleLevel: userFormData['companyLevels'],
            platformRole: userFormData['platformRoles'],
          };
        })
      )
      .subscribe((userModel: UserModel) => {
        if (this.entityState$.value === 'create') {
          this._save(userModel);
        }
        if (this.entityState$.value === 'update') {
          this._update(userModel);
        }
      });
  }

  onDisableButtonClicked() {}

  onRemoveButtonClicked() {}

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
