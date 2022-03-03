import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewFeedbackModel } from '../models/interview-feedback.model';
import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewFeedbackDTO } from '../types/interview-feedback.type';
import { InterviewAttendeeService } from './interview-attendee.service';
import { InterviewFeedbackHttpService } from './interview-feedback-http.service';
import { InterviewFeedbackSerializerService } from './interview-feedback-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewFeedbackService {
  constructor(
    private _httpService: InterviewFeedbackHttpService,
    private _serializationService: InterviewFeedbackSerializerService,
    private _attendee: InterviewAttendeeService
  ) {}

  findByInterviewRound(
    interviewRound: InterviewRoundModel
  ): Observable<InterviewFeedbackModel[]> {
    const feedbacks$: Observable<InterviewFeedbackDTO[]> =
      this._httpService.findByParam(
        'interviewsroundsId',
        String(interviewRound.getId())
      );

    const attendees$: Observable<InterviewAttendeeModel[]> =
      this._attendee.findByInterviewRound(interviewRound);

    return forkJoin([feedbacks$, attendees$]).pipe(
      map(([feedbacks, attendees]) => {
        const feedbacksModels = feedbacks.map((feedback) => {
          const [attendee] = attendees.filter((attendee) => {
            return attendee.getId() === feedback.interviewattendeesId;
          });

          return this._serializationService.deserialize(feedback, {
            interviewRound,
            attendee,
          });
        });

        return feedbacksModels;
      })
    );
  }
}
