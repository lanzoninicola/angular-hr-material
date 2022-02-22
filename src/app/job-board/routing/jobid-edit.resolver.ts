import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { JobIdModel } from '../models/jobid.model';
import { JobBoardStoreService } from '../services/job-board-store.service';
import { JobBoardService } from '../services/job-board.service';

@Injectable({
  providedIn: 'root',
})
export class JobidEditResolver implements Resolve<JobIdModel> {
  entityIdParam: number;

  constructor(
    private _store: JobBoardStoreService,
    private _dataService: JobBoardService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobIdModel> {
    this.entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+this.entityIdParam)) {
      this._goBack();
    }

    return this._dataService.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.store.currentJobId = entity;
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
