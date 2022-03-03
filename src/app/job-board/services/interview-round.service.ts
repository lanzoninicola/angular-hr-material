import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';

import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewModel } from '../models/interview.model';
import { InterviewRoundDTO } from '../types/interview-round.type';
import { InterviewRoundHttpService } from './interview-round-http.service';
import { InterviewRoundSerializerService } from './interview-round-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundService {
  constructor(
    private _httpService: InterviewRoundHttpService,
    private _serializationService: InterviewRoundSerializerService,
    private _picklistService: PicklistService
  ) {}

  findByInterview(
    interview: InterviewModel
  ): Observable<InterviewRoundModel[]> {
    const rounds$: Observable<InterviewRoundDTO[]> =
      this._httpService.findByParam('interviewsId', String(interview.getId()));

    return forkJoin([rounds$]).pipe(
      map(([rounds]) => {
        const interviewsRounds = rounds.map((round) => {
          return this._serializationService.deserialize(round, {
            interview,
          });
        });

        return interviewsRounds;
      })
    );
  }
}
