import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

import { RequestToHireModel } from '../models/request-to-hire.model';

import { RequestToHireStoreService } from '../services/request-to-hire-store.service';
import { RequestToHireService } from '../services/request-to-hire.service';

@Injectable({
  providedIn: 'root',
})
export class RequestEditResolver implements Resolve<any> {
  entityIdParam: number;

  constructor(
    private _store: RequestToHireStoreService,
    private _dataService: RequestToHireService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RequestToHireModel> {
    this.entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+this.entityIdParam)) {
      this._goBack();
    }

    return this._shouldEntityCached()
      ? this._getEntityFromCache()
      : this._getEntityFromServer();
  }

  private _shouldEntityCached() {
    const currentEntity = this._dataService.store.currentRequest;

    if (currentEntity !== undefined) {
      if (currentEntity instanceof RequestToHireModel) {
        return currentEntity.getId() === this.entityIdParam;
      }
    }

    return false;
  }

  private _getEntityFromCache(): Observable<RequestToHireModel> {
    this._setEntityState();
    return of(this._dataService.store.currentRequest);
  }

  private _getEntityFromServer(): Observable<RequestToHireModel> {
    return this._dataService.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.store.currentRequest = entity;
        this._setEntityState();
      })
    );
  }

  private _setEntityState() {
    this._store.entityStateUpdate();
  }

  private _goBack() {
    return () => {
      this._location.back();
      return EMPTY;
    };
  }
}
