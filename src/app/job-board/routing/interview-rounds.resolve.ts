import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { InterviewRoundModel } from '../models/interview-round.model';

import { InterviewModel } from '../models/interview.model';
import { InterviewRoundService } from '../services/interview-round.service';
import { InterviewService } from '../services/interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundsResolver implements Resolve<InterviewRoundModel[]> {
  entityIdParam: number;

  constructor(
    private _interview: InterviewService,
    private _interviewRound: InterviewRoundService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<InterviewRoundModel[]> {
    // return this._interview.stateCurrentInterview$.pipe(
    //   switchMap((interview) => {
    //     console.log(interview);
    //     if (interview) {
    //       return this._interviewRound.findByInterview(interview).pipe(
    //         tap((interviewRounds) => {
    //           this._interviewRound.stateCurrentInterviewRounds$.next(
    //             interviewRounds
    //           );
    //         })
    //       );
    //     }
    //     return of([]);
    //   })
    // );

    return this._interview.stateCurrentInterview$.pipe(
      switchMap((interview) => {
        console.log(interview);
        if (interview) {
          return this._interviewRound.findByInterview(interview).pipe(
            tap((interviewRounds) => {
              this._interviewRound.stateCurrentInterviewRounds$.next(
                interviewRounds
              );
            })
          );
        }
        return of([]);
      })
    );
  }
}
