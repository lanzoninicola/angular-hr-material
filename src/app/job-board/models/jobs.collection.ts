import { JobIdModel } from './job-id.model';

export class JobsCollection {
  items: JobIdModel[];

  constructor(jobid: JobIdModel[]) {
    this.items = jobid;
  }

  add(item: JobIdModel) {
    this.items.push(item);
  }

  findItemById(id: number): JobIdModel {
    return this.items.find((item) => item.getId() === id) || ({} as JobIdModel);
  }
}
