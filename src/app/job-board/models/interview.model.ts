import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from './job-application.model';

export class InterviewModel {
  id: number;
  jobApplication: JobApplicationModel;
  status: PicklistItemModel;
  rating: number;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    jobApplication: JobApplicationModel,
    status: PicklistItemModel,
    rating: number,
    scheduledAt: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.jobApplication = jobApplication;
    this.status = status;
    this.rating = rating;
    this.scheduledAt = scheduledAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getJobApplication(): JobApplicationModel {
    return this.jobApplication;
  }

  getStatus(): PicklistItemModel {
    return this.status;
  }

  getRating(): number {
    return this.rating;
  }

  getScheduleAt(): Date {
    return this.scheduledAt;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
