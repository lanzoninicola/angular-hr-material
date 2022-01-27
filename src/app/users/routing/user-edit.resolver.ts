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
    const userId = parseInt(route.params['id'], 10);

    if (Number.isNaN(+userId)) {
      this.router.navigate(['users']);
      return of({} as UserModel);
    }

    return this._userService.findById(route.params['id']).pipe(
      map((user) => user),
      catchError(() => {
        this.router.navigate(['users']);
        return of({} as UserModel);
      })
    );
  }
}

// TODO: Check the behavior: here we returns an Observable but in the component is returned plain data
