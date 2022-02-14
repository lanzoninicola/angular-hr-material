import { PicklistItemModel } from './picklist-item.model';

export class PicklistModel {
  items: PicklistItemModel[];

  constructor(picklistItems: PicklistItemModel[]) {
    this.items = picklistItems;
  }

  findItemByValue(value: string): PicklistItemModel | undefined {
    return this.items.find(
      (item) => item.getValue().toLowerCase() === value.toLowerCase()
    );
  }
}
