import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { HttpErrorService } from 'src/app/core/services/http-error.service';

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
    private router: Router,
    private _httpErrorService: HttpErrorService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    const userIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+userIdParam)) {
      this.router.navigate(['users']);
      return EMPTY;
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

    return this._userService.findById(route.params['id']).pipe(
      catchError(this._goBackToUserList()),
      catchError(this._httpErrorService.handle<any>('open the user profile')),
      tap((user) => {
        this._store.set('userEdit-currentUser', user);
        this._store.set('userEdit-entityState', 'update');
      })
    );
  }

  private _goBackToUserList() {
    return () => {
      this.router.navigate(['users']);
      return EMPTY;
    };
  }
}

// TODO: Check the behavior: here we returns an Observable but in the component is returned plain data
