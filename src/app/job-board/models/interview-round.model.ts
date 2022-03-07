import { InterviewModel } from './interview.model';

export class InterviewRoundModel {
  id: number;
  interview: InterviewModel;
  name: string;
  score: number;
  passed: boolean | null;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    interview: InterviewModel,
    name: string,
    score: number,
    passed: boolean | null,
    scheduledAt: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.interview = interview;
    this.name = name;
    this.score = score;
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

  getScore(): number {
    return this.score;
  }

  getPassed(): boolean | null {
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
