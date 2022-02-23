import { JobApplicationActivityModel } from './ja-activity.model';

export class JobApplicationActivityCollection {
  items: JobApplicationActivityModel[];

  constructor(items: JobApplicationActivityModel[]) {
    this.items = items;
  }

  getItems(): JobApplicationActivityModel[] {
    return this.items;
  }

  add(item: JobApplicationActivityModel) {
    this.items.push(item);
  }

  findItemById(id: number): JobApplicationActivityModel {
    return (
      this.items.find((item) => item.getId() === id) ||
      ({} as JobApplicationActivityModel)
    );
  }
}
