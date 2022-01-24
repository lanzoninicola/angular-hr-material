import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { UsersService } from '../services/users.service';
import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserEditResolver implements Resolve<UserModel> {
  constructor(private _userService: UsersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    const userId = route.params['id'];

    if (Number.isNaN(+userId)) {
      this.router.navigate(['users']);
      return of({} as UserModel);
    }

    return this._userService.getUserById(route.params['id']).pipe(
      map((user) => user),
      catchError(() => {
        this.router.navigate(['users']);
        return of({} as UserModel);
      })
    );
  }
}
