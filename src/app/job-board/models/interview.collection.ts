import { InterviewModel } from './interview.model';

export class InterviewCollection {
  items: InterviewModel[];

  constructor(items: InterviewModel[]) {
    this.items = items;
  }

  getItems(): InterviewModel[] {
    return this.items;
  }

  add(item: InterviewModel) {
    this.items.push(item);
  }

  findItemById(id: number): InterviewModel {
    return (
      this.items.find((item) => item.getId() === id) || ({} as InterviewModel)
    );
  }
}
