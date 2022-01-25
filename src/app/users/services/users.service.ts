import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserHttpResponse, UserModel } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersDataSet$: BehaviorSubject<UserModel[]> = new BehaviorSubject<
    UserModel[]
  >([]);

  constructor(private http: HttpClient) {}

  getAllUsers(): BehaviorSubject<UserModel[]> {
    this.http
      .get<UserModel[]>(`${environment.API}/users`)
      .pipe(
        map((userData) => {
          return userData.map((user) => {
            return {
              ...user,
              fullName: `${user.lastname} ${user.firstname}`,
            };
          });
        })
      )
      .subscribe((usersData) => {
        this.usersDataSet$.next(usersData);
      });

    return this.usersDataSet$;
  }

  getUserById(id: number) {
    return this.http
      .get<UserHttpResponse>(`${environment.API}/users/${id}`)
      .pipe(
        map((userData) => {
          return {
            ...userData,
            fullName: `${userData.lastname} ${userData.firstname}`,
          } as UserModel;
        })
      );
  }
}
