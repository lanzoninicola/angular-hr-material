import { InterviewAttendeeModel } from './interview-attendee.model';
import { InterviewRoundModel } from './interview-round.model';

export class InterviewFeedbackModel {
  id: number;
  interviewRound: InterviewRoundModel;
  attendee: InterviewAttendeeModel;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    interviewRound: InterviewRoundModel,
    attendee: InterviewAttendeeModel,
    rating: number,
    feedback: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.interviewRound = interviewRound;
    this.attendee = attendee;
    this.rating = rating;
    this.feedback = feedback;
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

  getFeedback(): string {
    return this.feedback;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
