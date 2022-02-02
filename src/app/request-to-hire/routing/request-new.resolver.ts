import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';

@Injectable({
  providedIn: 'root',
})
export class RequestNewResolver implements Resolve<boolean> {
  constructor(private _store: RequestToHireStoreService) {}

  resolve(): Observable<boolean> {
    this._store.entityStateCreate();

    return of(true);
  }
}
