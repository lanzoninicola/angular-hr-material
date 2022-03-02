import { UserModel } from 'src/app/users/models/user.model';
import { InterviewModel } from './interview.model';

export class InterviewAttendeeModel {
  id: number;
  interview: InterviewModel;
  attendee: UserModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    interview: InterviewModel,
    attendee: UserModel,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.interview = interview;
    this.attendee = attendee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getInterview(): InterviewModel {
    return this.interview;
  }

  getAttendee(): UserModel {
    return this.attendee;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
