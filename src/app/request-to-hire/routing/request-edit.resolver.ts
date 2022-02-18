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

    return this._dataService.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.store.currentRequest = entity;
        this._store.entityStateUpdate();
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
