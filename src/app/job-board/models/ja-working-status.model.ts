import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';

export class JobApplicationWorkingStatusModel {
  id: number;
  status: PicklistItemModel;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    status: PicklistItemModel,
    description: string,
    order: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.status = status;
    this.description = description;
    this.order = order;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getStatus(): PicklistItemModel {
    return this.status;
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
