import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewFeedbackModel } from '../models/interview-feedback.model';
import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewFeedbackFormData } from '../types/interview-feedback.form.type';
import { InterviewFeedbackDTO } from '../types/interview-feedback.type';
import { InterviewAttendeeService } from './interview-attendee.service';
import { InterviewFeedbackHttpService } from './interview-feedback-http.service';
import { InterviewFeedbackSerializerService } from './interview-feedback-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewFeedbackService {
  stateFeedbacks$ = new BehaviorSubject<InterviewFeedbackModel[]>([]);
  stateEntityState$ = new BehaviorSubject<EntityState>('idle');
  stateShowEditForm$ = new BehaviorSubject<boolean>(false);
  stateFeedbackEditable$ = new BehaviorSubject<number | null>(null);
  stateInterviewScoreOnFeedback$ = new BehaviorSubject<number>(0);

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

  save(model: InterviewFeedbackModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto);
  }

  update(model: InterviewFeedbackModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto);
  }

  delete(id: number) {
    return this._httpService.delete(id);
  }

  getEntityModelFromFormData(
    formData: InterviewFeedbackFormData
  ): InterviewFeedbackModel {
    return new InterviewFeedbackModel(
      formData.id,
      formData.interviewsroundsId,
      formData.interviewattendeesId,
      formData.rating,
      formData.description,
      formData.createdAt,
      formData.updatedAt
    );
  }
}
