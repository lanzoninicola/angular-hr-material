import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

import { UsersStoreService } from '../services/user-store.service';
import { UsersService } from '../services/users.service';
import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserEditResolver implements Resolve<UserModel> {
  constructor(
    private _store: UsersStoreService,
    private _userService: UsersService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    console.log('...resolver....');
    const userIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+userIdParam)) {
      this._goBack();
    }

    const currentUserInStore: UserModel = this._store.get(
      'userEdit-currentUser'
    );

    if (currentUserInStore) {
      if (currentUserInStore.id === userIdParam) {
        this._store.set('userEdit-entityState', 'update');
        return of(currentUserInStore);
      }
    }

    return this._userService.findById(userIdParam).pipe(
      //TODO: how can we handle the catching now, if we have a HttpBackendErrorInterceptor?
      catchError(this._goBack()),
      tap((user) => {
        this._store.set('userEdit-currentUser', user);
        this._store.set('userEdit-entityState', 'update');
      })
    );
  }

  private _goBack() {
    return () => {
      this._location.back();
      return EMPTY;
    };
  }
}

// TODO: Check the behavior: here we returns an Observable but in the component is returned plain data
