import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { UserModel } from '../types/user.type';
import { UsersStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private _store: UsersStoreService,
    private _options: HttpRequestOptionsService
  ) {}

  findAll() {
    return this.http
      .get<UserModel[]>(
        `${environment.API}/users`,
        this._options.backendRequest()
      )
      .pipe(
        map((userData) => {
          return userData.map((user) => {
            return {
              ...user,
              fullName: `${user.lastname} ${user.firstname}`,
            };
          });
        })
      );
  }

  findById(id: number) {
    return this.http
      .get<UserModel>(
        `${environment.API}/users/${id}`,
        this._options.backendRequest()
      )
      .pipe(
        map((userData: UserModel) => {
          return {
            ...userData,
            fullName: `${userData.lastname} ${userData.firstname}`,
          };
        })
      );
  }

  save(userData: UserModel) {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    return this.http
      .post<UserModel>(
        `${environment.API}/users`,
        userData,
        this._options.formSubmission()
      )
      .subscribe((newUser) => {
        this._store.set('userEdit-currentUser', newUser);
      });
  }

  update(userData: UserModel) {
    const { id } = userData;

    this.http
      .patch<any>(
        `${environment.API}/users/${id}`,
        userData,
        this._options.formSubmission()
      )
      .subscribe((updatedUser) => {
        this._store.set('userEdit-currentUser', updatedUser);
      });
  }
}

// TODO: UserService see below

/*

See this article for caching
https://indepth.dev/posts/1450/how-to-use-ts-decorators-to-add-caching-logic-to-api-calls

The getAll() method cache the result in the UserStore

The findById check in the store the user

Add button in the top bar of section, when pressed update the userStore with the new list that fired a new getAll() User

Automate the update of the userStore :
First solution: after xxx second or minutes (in the global settings the user can decide holding the button that show the options), 

Force after xxx minutes of inactivity (need to track the activity)

*/
