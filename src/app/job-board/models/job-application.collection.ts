import { JobApplicationModel } from './job-application.model';

export class JobsApplicationsCollection {
  items: JobApplicationModel[] = [];

  constructor(candidates: JobApplicationModel[]) {
    this.items = candidates;
  }

  findItemById(id: number): JobApplicationModel | null {
    return this.items.find((item) => item.getId() === id) || null;
  }
}
