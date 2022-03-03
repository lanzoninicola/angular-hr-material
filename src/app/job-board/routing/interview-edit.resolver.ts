import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { InterviewModel } from '../models/interview.model';
import { InterviewService } from '../services/interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewEditResolver implements Resolve<InterviewModel> {
  entityIdParam: number;

  constructor(
    private _dataService: InterviewService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<InterviewModel> {
    this.entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+this.entityIdParam)) {
      this._goBack();
    }

    return this._dataService.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._dataService.stateCurrentInterview$.next(entity);
        this._dataService.stateEntityState$.next('update');
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
