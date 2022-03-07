import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewFeedbackModel } from '../models/interview-feedback.model';
import { InterviewRoundModel } from '../models/interview-round.model';
import { InterviewFeedbackDTO } from '../types/interview-feedback.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewFeedbackSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: InterviewFeedbackDTO,
    relations: {
      interviewRound: InterviewRoundModel;
      attendee: InterviewAttendeeModel;
    }
  ): InterviewFeedbackModel {
    return new InterviewFeedbackModel(
      dto.id,
      relations.interviewRound,
      relations.attendee,
      dto.score,
      dto.description,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: InterviewFeedbackModel): InterviewFeedbackDTO {
    return {
      id: model.id,
      interviewsroundsId: model.getInterviewRound().getId(),
      interviewattendeesId: model.getAttendee().getId(),
      score: model.getScore(),
      description: model.getDescription(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
