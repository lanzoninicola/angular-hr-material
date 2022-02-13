import { PicklistItemModel } from './picklist-item.model';

export class PicklistModel {
  items: PicklistItemModel[];

  constructor(picklistItems: PicklistItemModel[]) {
    this.items = picklistItems;
  }
}
