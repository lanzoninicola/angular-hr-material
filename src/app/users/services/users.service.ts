import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { ErrorService } from 'src/app/core/services/error.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import { UserFormData } from '../types/user-edit-form.types';

import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private _errorService: ErrorService,
    private _messageService: MessageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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
      map((userData) => {
        return {
          ...userData,
          fullName: `${userData.lastname} ${userData.firstname}`,
        };
      })
    );
  }

  save(userData: UserModel): Observable<UserModel> {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    console.log('save service');
    return this.http
      .post<UserModel>(`${environment.API}/users`, userData, this.httpOptions)
      .pipe(catchError(this._handleError<any>('saveUser')));
  }

  update(userData: UserModel): Observable<UserModel> {
    console.log('update service');
    const { id } = userData;

    return this.http
      .patch<UserModel>(
        `${environment.API}/users/${id}`,
        userData,
        this.httpOptions
      )
      .pipe(catchError(this._handleError<any>('saveUser')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private _handleError<T>(operation = 'operation', result?: T) {
    return this._errorService.handleHttpError(operation, result);
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
