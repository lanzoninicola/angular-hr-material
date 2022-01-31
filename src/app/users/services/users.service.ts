import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpErrorService } from 'src/app/core/services/http-error.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';

import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private _httpErrorService: HttpErrorService,
    private _messageService: MessageService
  ) {}

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
      catchError(this._httpErrorService.handle<any>('Getting the user')),
      map((userData: UserModel) => {
        return {
          ...userData,
          fullName: `${userData.lastname} ${userData.firstname}`,
        };
      })
    );
  }

  save(userData: UserModel): Observable<UserModel> {
    //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
    return this.http
      .post<UserModel>(`${environment.API}/users`, userData, this.httpOptions)
      .pipe(catchError(this._httpErrorService.handle<any>('Saving the user')));
  }

  update(userData: UserModel): Observable<UserModel> {
    const { id } = userData;

    return this.http
      .patch<UserModel>(
        `${environment.API}/users/${id}`,
        userData,
        this.httpOptions
      )
      .pipe(catchError(this._httpErrorService.handle<any>('Updating user')));
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
