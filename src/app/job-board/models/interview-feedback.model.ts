import { InterviewAttendeeModel } from './interview-attendee.model';
import { InterviewRoundModel } from './interview-round.model';

export class InterviewFeedbackModel {
  id: number;
  interviewRound: InterviewRoundModel;
  attendee: InterviewAttendeeModel;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    interviewRound: InterviewRoundModel,
    attendee: InterviewAttendeeModel,
    rating: number,
    description: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.interviewRound = interviewRound;
    this.attendee = attendee;
    this.rating = rating;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getInterviewRound(): InterviewRoundModel {
    return this.interviewRound;
  }

  getAttendee(): InterviewAttendeeModel {
    return this.attendee;
  }

  getRating(): number {
    return this.rating;
  }

  getDescription(): string {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
