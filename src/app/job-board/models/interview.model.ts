import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { JobApplicationModel } from './job-application.model';

export class InterviewModel {
  id: number;
  jobApplication: JobApplicationModel;
  stage: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    jobApplication: JobApplicationModel,
    stage: PicklistItemModel,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.jobApplication = jobApplication;
    this.stage = stage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getJobApplication(): JobApplicationModel {
    return this.jobApplication;
  }

  getStage(): PicklistItemModel {
    return this.stage;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
