import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { JobApplicationModel } from '../models/job-application.model';
import { JobApplicationsService } from '../services/job-applications.service';
import { JobBoardStoreService } from '../services/job-board-store.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationEditResolver
  implements Resolve<JobApplicationModel>
{
  entityIdParam: number;

  constructor(
    private _store: JobBoardStoreService,
    private _dataService: JobApplicationsService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<JobApplicationModel> {
    this.entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+this.entityIdParam)) {
      this._goBack();
    }

    return this._dataService.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.store.currentApplication = entity;
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
