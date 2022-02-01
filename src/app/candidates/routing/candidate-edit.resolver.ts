import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { Location } from '@angular/common';

import { CandidatesStoreService } from '../services/candidates-store.service';
import { CandidatesService } from '../services/candidates.service';
import { CandidateModel } from '../types/candidates.types';

@Injectable({
  providedIn: 'root',
})
export class CandidateEditResolver implements Resolve<CandidateModel> {
  constructor(
    private _store: CandidatesStoreService,
    private _dataService: CandidatesService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CandidateModel> {
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
