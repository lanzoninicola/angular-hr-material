import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';

import { CandidateModel } from '../models/candidate.model';
import { CandidateStoreService } from '../services/candidate-store.service';
import { CandidateService } from '../services/candidate.service';

@Injectable({
  providedIn: 'root',
})
export class CandidateEditResolver implements Resolve<CandidateModel> {
  constructor(
    private _store: CandidateStoreService,
    private _dataService: CandidateService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CandidateModel> {
    const entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+entityIdParam)) {
      this._goBack();
    }

    return this._dataService.findById(entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.store.currentCandidate = entity;
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
