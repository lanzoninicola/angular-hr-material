import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';
import { RequestToHireService } from '../services/request-to-hire.service';
import { RequestToHireModel } from '../types/request-to-hire.type';

@Injectable({
  providedIn: 'root',
})
export class RequestEditResolver implements Resolve<RequestToHireModel> {
  constructor(
    private _store: RequestToHireStoreService,
    private _dataService: RequestToHireService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RequestToHireModel> {
    const store = this._store;
    const entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+entityIdParam)) {
      this._goBack();
    }

    if (store.currentEntity !== undefined) {
      const { id } = store.currentEntity;
      if (id === entityIdParam) {
        store.entityStateUpdate();
        return of(store.currentEntity);
      }
    }

    return this._dataService.findById(entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        store.currentEntity = entity;
        store.entityStateUpdate();
      })
    );
  }

  private _goBack() {
    return () => {
      this._location.back();
      return EMPTY;
    };
  }
}
