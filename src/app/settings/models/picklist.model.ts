import { PicklistItemModel } from './picklist-item.model';

export class PicklistModel {
  EMPTY: PicklistItemModel = new PicklistItemModel(0, '', '');
  items: PicklistItemModel[];

  constructor(picklistItems: PicklistItemModel[]) {
    this.items = picklistItems;
  }

  findItemById(id: number): PicklistItemModel {
    return this.items.find((item) => item.getId() === id) || this.EMPTY;
  }

  findItemByValue(value: string): PicklistItemModel {
    return (
      this.items.find(
        (item) => item.getValue().toLowerCase() === value.toLowerCase()
      ) || this.EMPTY
    );
  }
}
