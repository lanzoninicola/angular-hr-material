import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';

import { UserModel } from '../models/user.model';
import { UsersCollection } from '../models/users.collection';
import { UserDTO } from '../types/user.type';

import { UsersStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private _httpOptions: HttpRequestOptionsService,
    private _store: UsersStoreService
  ) {}

  findAll(): Observable<UsersCollection> {
    return this.http
      .get<UserDTO[]>(
        `${environment.API}/users`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map<UserDTO[], UsersCollection>((usersData) => {
          const users = usersData.map((user) => {
            return new UserModel(
              user['id'],
              user['firstname'],
              user['lastname'],
              user['email'],
              user['recruitingRole'],
              user['department'],
              user['companyRoleLevel'],
              user['isAdmin']
            );
          });

          return new UsersCollection(users);
        })
      );
  }

  findById(id: number) {
    return this.http
      .get<UserModel>(
        `${environment.API}/users/${id}`,
        this._httpOptions.isBackendRequest()
      )
      .pipe(
        map(
          (userData: UserModel) =>
            new UserModel(
              userData['id'],
              userData['firstname'],
              userData['lastname'],
              userData['email'],
              userData['recruitingRole'],
              userData['department'],
              userData['companyRoleLevel'],
              userData['isAdmin']
            )
        )
      );
  }

  save(userData: UserModel) {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    return this.http
      .post<UserModel>(
        `${environment.API}/users`,
        userData,
        this._httpOptions.isFormSubmission()
      )
      .subscribe((newUser) => {
        this._store.currentEntity = newUser;
      });
  }

  update(userData: UserModel) {
    this.http
      .patch<any>(
        `${environment.API}/users/${userData.getId()}`,
        userData,
        this._httpOptions.isFormSubmission()
      )
      .subscribe((updatedUser) => {
        this._store.currentEntity = updatedUser;
      });
  }
}

// TODO: UserService see below

/*

See this article for caching
https://indepth.dev/posts/1450/how-to-use-ts-decorators-to-add-caching-logic-to-api-calls

The getAll() method cache the result in the UserStore

The findById check in the store the user

Add button in the top bar of section, when pressed update the userStore with the new list that fired a new getAll() UserModel

Automate the update of the userStore :
First solution: after xxx second or minutes (in the global settings the user can decide holding the button that show the options), 

Force after xxx minutes of inactivity (need to track the activity)

*/
