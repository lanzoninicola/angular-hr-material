import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from './job-application.model';

export class JobApplicationActivityModel {
  id: number;
  jobsapplicationsId: JobApplicationModel;
  date: Date;
  type: PicklistItemModel;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    jobsapplicationsId: JobApplicationModel,
    date: Date,
    type: PicklistItemModel,
    description: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.jobsapplicationsId = jobsapplicationsId;
    this.date = date;
    this.type = type;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getJobsapplicationsId(): JobApplicationModel {
    return this.jobsapplicationsId;
  }

  getDate(): Date {
    return this.date;
  }

  getType(): PicklistItemModel {
    return this.type;
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
