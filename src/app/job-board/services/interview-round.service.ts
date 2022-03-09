import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';

import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewCollection } from '../models/interview.collection';
import { InterviewModel } from '../models/interview.model';
import { JobApplicationModel } from '../models/job-application.model';
import { InterviewRoundDTO } from '../types/interview-round.dto.type';
import { InterviewRoundOnListTable } from '../types/interview.list.type';
import { InterviewRoundHttpService } from './interview-round-http.service';
import { InterviewRoundSerializerService } from './interview-round-serializer.service';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundService {
  stateCurrentInterviewRounds$ = new BehaviorSubject<InterviewRoundModel[]>([]);
  stateInterviewRoundSelected$ =
    new BehaviorSubject<InterviewRoundModel | null>(null);

  constructor(
    private _httpService: InterviewRoundHttpService,
    private _serializationService: InterviewRoundSerializerService,
    private _interviewService: InterviewService
  ) {}

  // findAll(): Observable<InterviewRoundModel[]> {
  //   const rounds$: Observable<InterviewRoundDTO[]> = this._httpService.findAll();

  //   return forkJoin([rounds$]).pipe(
  //     map(([rounds]) => {
  //       const interviewsRounds = rounds.map((round) => {
  //         return this._serializationService.deserialize(round);
  //       });

  //       return interviewsRounds;
  //     })
  //   );
  // }

  findById(id: number): Observable<InterviewRoundModel> {
    const round$: Observable<InterviewRoundDTO> =
      this._httpService.findById(id);

    const interview$: Observable<InterviewModel> = round$.pipe(
      switchMap((round) => {
        return this._interviewService.findById(round.interviewsId);
      })
    );

    return forkJoin([round$, interview$]).pipe(
      map(([round, interview]) => {
        return this._serializationService.deserialize(round, {
          interview,
        });
      })
    );
  }

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

  findByJobApplication(
    jobApplication: JobApplicationModel
  ): Observable<InterviewRoundModel[]> {
    const interviews$ =
      this._interviewService.findByJobApplication(jobApplication);

    const rounds$: Observable<InterviewRoundDTO[]> = interviews$.pipe(
      switchMap((interviews) => {
        const roundsIds = interviews.getItems().map((interview) => {
          return String(interview.getId());
        });

        return this._httpService.findByParamValues('interviewsId', roundsIds);
      })
    );

    return forkJoin([interviews$, rounds$]).pipe(
      map(([interviews, rounds]) => {
        const interviewsRounds = rounds.map((round) => {
          return this._serializationService.deserialize(round, {
            interview: interviews.findItemById(round.interviewsId),
          });
        });

        return interviewsRounds;
      })
    );
  }

  findAllOpen(): Observable<InterviewRoundModel[]> {
    const interviews$: Observable<InterviewCollection> =
      this._interviewService.findAllOpen();

    const rounds$: Observable<InterviewRoundDTO[]> = interviews$.pipe(
      switchMap((interviews) => {
        const roundsIds = interviews.getItems().map((interview) => {
          return String(interview.getId());
        });

        return this._httpService.findByParamValues('interviewsId', roundsIds);
      })
    );

    return forkJoin([interviews$, rounds$]).pipe(
      map(([interviews, rounds]) => {
        const interviewsRounds = rounds.map((round) => {
          return this._serializationService.deserialize(round, {
            interview: interviews.findItemById(round.interviewsId),
          });
        });

        return interviewsRounds;
      })
    );
  }

  getListOfAllInterviewRounds() {
    return this.findAllOpen().pipe(
      map<InterviewRoundModel[], InterviewRoundOnListTable[]>((interviews) => {
        return this.transform(interviews);
      })
    );
  }

  getListOfInterviewRoundsByJobApplication(application: JobApplicationModel) {
    return this.findByJobApplication(application).pipe(
      map<InterviewRoundModel[], InterviewRoundOnListTable[]>((interviews) => {
        return this.transform(interviews);
      })
    );
  }

  transform(
    interviewRounds: InterviewRoundModel[]
  ): InterviewRoundOnListTable[] {
    return interviewRounds.map((round) => {
      return {
        interviewId: round.getInterview().getId(),
        roundId: round.getId(),
        jobApplication: round.getInterview().getJobApplication(),
        candidate: round.getInterview().getJobApplication().getCandidate(),
        jobId: round.getInterview().getJobApplication().getJobsId(),
        roundName: round.getName(),
        stage: round.getInterview().getStage(),
        scheduledAt: round.getScheduledAt(),
        createdAt: round.getCreatedAt(),
        updatedAt: round.getUpdatedAt(),
      };
    });
  }
}
