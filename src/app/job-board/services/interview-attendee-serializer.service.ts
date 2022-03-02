import { Injectable } from '@angular/core';
import { DateService } from 'src/app/core/services/date.service';
import { UserModel } from 'src/app/users/models/user.model';
import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewModel } from '../models/interview.model';
import { InterviewAttendeeDTO } from '../types/interview.dto.type';

@Injectable({
  providedIn: 'root',
})
export class InterviewAttendeeSerializerService {
  constructor(private _dateService: DateService) {}

  deserialize(
    dto: InterviewAttendeeDTO,
    relations: {
      interview: InterviewModel;
      user: UserModel;
    }
  ): InterviewAttendeeModel {
    return new InterviewAttendeeModel(
      dto.id,
      relations.interview,
      relations.user,
      this._dateService.ISOToFullDate(dto.createdAt),
      this._dateService.ISOToFullDate(dto.updatedAt)
    );
  }

  serialize(model: InterviewAttendeeModel): InterviewAttendeeDTO {
    return {
      id: model.id,
      interviewsId: model.interview.getId(),
      attendeesId: model.attendee.getId(),
      createdAt: this._dateService.dateToISOString(model.createdAt),
      updatedAt: this._dateService.dateToISOString(model.updatedAt),
    };
  }
}
