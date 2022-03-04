import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { InterviewModel } from '../models/interview.model';
import { InterviewRoundService } from '../services/interview-round.service';
import { InterviewService } from '../services/interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewEditResolver implements Resolve<InterviewModel> {
  entityIdParam: number;

  constructor(
    private _interview: InterviewService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<InterviewModel> {
    this.entityIdParam = parseInt(route.params['id'], 10);

    if (Number.isNaN(+this.entityIdParam)) {
      this._goBack();
    }

    return this._interview.findById(this.entityIdParam).pipe(
      catchError(this._goBack()),
      tap((entity) => {
        this._interview.stateCurrentInterview$.next(entity);
        this._interview.stateEntityState$.next('update');
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
