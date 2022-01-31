import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserModel } from '../types/user.type';
import { UsersStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private _store: UsersStoreService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'form-action': 'submitted',
    }),
  };

  findAll() {
    return this.http.get<UserModel[]>(`${environment.API}/users`).pipe(
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
    return this.http.get<UserModel>(`${environment.API}/users/${id}`).pipe(
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
      .post<UserModel>(`${environment.API}/users`, userData, this.httpOptions)
      .subscribe((newUser) => {
        this._store.set('userEdit-currentUser', newUser);
      });
  }

  update(userData: UserModel) {
    const { id } = userData;

    this.http
      .patch<any>(`${environment.API}/users/${id}`, userData, this.httpOptions)
      .subscribe((updatedUser) => {
        this._store.set('userEdit-currentUser', updatedUser);
      });
  }
}

// TODO: UserService see below

/*

The getAll() method cache the result in the UserStore

The findById check in the store the user

Add button in the top bar of section, when pressed update the userStore with the new list that fired a new getAll() User

Automate the update of the userStore :
First solution: after xxx second or minutes (in the global settings the user can decide holding the button that show the options), 

Force after xxx minutes of inactivity (need to track the activity)

*/
