import { JobApplicationWorkingStatusModel } from './ja-working-status.model';

export class JobApplicationWorkingStatusCollection {
  items: JobApplicationWorkingStatusModel[];

  constructor(items: JobApplicationWorkingStatusModel[]) {
    this.items = items;
  }

  getItems(): JobApplicationWorkingStatusModel[] {
    return this.items;
  }

  add(item: JobApplicationWorkingStatusModel) {
    this.items.push(item);
  }

  findItemById(id: number): JobApplicationWorkingStatusModel {
    return (
      this.items.find((item) => item.getId() === id) ||
      ({} as JobApplicationWorkingStatusModel)
    );
  }
}
