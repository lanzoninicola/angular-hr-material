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
    const store = this._store;
    const entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+entityIdParam)) {
      this._goBack();
    }

    if (store.currentEntity !== undefined) {
      const { id } = store.currentEntity;
      if (id === entityIdParam) {
        store.entityStateUpdate();
        return of(store.currentEntity);
      }
    }

    return this._userService.findById(entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        store.currentEntity = entity;
        store.entityStateUpdate();
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
