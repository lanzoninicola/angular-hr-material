import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of } from 'rxjs';
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
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    const userIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+userIdParam)) {
      this.router.navigate(['users']);
      return EMPTY;
    }

    const currentUserInStore: UserModel = this._store.get(
      'userEdit-currentUser'
    ).value;

    if (currentUserInStore) {
      if (currentUserInStore.id === userIdParam) {
        this._store.set('userEdit-formState', 'update');
        return of(currentUserInStore);
      }
    }

    return this._userService.findById(route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['users']);
        return of({} as UserModel);
      }),
      map((user) => {
        this._store.set('userEdit-currentUser', user);
        this._store.set('userEdit-formState', 'update');
        return user;
      })
    );
  }
}

// TODO: Check the behavior: here we returns an Observable but in the component is returned plain data
