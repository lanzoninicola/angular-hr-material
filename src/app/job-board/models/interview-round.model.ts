import { InterviewAttendeeModel } from './interview-attendee.model';
import { InterviewFeedbackModel } from './interview-feedback.model';
import { InterviewModel } from './interview.model';

export class InterviewRoundModel {
  id: number;
  interview: InterviewModel;
  name: string;
  rating: number;
  passed: boolean;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    interview: InterviewModel,
    name: string,
    rating: number,
    passed: boolean,
    scheduledAt: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.interview = interview;
    this.name = name;
    this.rating = rating;
    this.passed = passed;
    this.scheduledAt = scheduledAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getInterview(): InterviewModel {
    return this.interview;
  }

  getName(): string {
    return this.name;
  }

  getRating(): number {
    return this.rating;
  }

  getPassed(): boolean {
    return this.passed;
  }

  getScheduledAt(): Date {
    return this.scheduledAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
