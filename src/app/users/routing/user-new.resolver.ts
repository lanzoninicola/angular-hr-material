import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { UsersStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class UserNewResolver implements Resolve<boolean> {
  constructor(private _store: UsersStoreService) {}

  resolve(): Observable<boolean> {
    this._store.entityStateCreate();

    return of(true);
  }
}
