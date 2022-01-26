import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

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

  save(userData$: BehaviorSubject<UserModel>) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    userData$.pipe(
      map((userData) => {
        return {
          ...userData,
          fullName: `${userData.lastname} ${userData.firstname}`,
        };
      }),
      distinctUntilChanged(),
      switchMap((userModel) => {
        return this.http.post<UserModel>(
          `${environment.API}/users`,
          userModel,
          httpOptions
        );
      })
    );
  }
}
