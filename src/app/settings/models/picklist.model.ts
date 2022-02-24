import { PicklistItemModel } from './picklist-item.model';

export class PicklistModel {
  items: PicklistItemModel[];

  constructor(picklistItems: PicklistItemModel[]) {
    this.items = picklistItems;
  }

  getItems(): PicklistItemModel[] {
    return this.items;
  }

  findItemById(id: number): PicklistItemModel {
    return (
      this.items.find((item) => item.getId() === id) ||
      ({} as PicklistItemModel)
    );
  }

  findItemByType(type: string): PicklistItemModel[] {
    const itemsFiltered = this.items.filter((item) => item.getType() === type);

    return this._orderItems(itemsFiltered);
  }

  findItemByValue(value: string): PicklistItemModel {
    return (
      this.items.find(
        (item) => item.getValue().toLowerCase() === value.toLowerCase()
      ) || ({} as PicklistItemModel)
    );
  }

  private _orderItems(items: PicklistItemModel[]): PicklistItemModel[] {
    return items.sort((prev, next) => {
      return prev.order - next.order;
    });
  }
}
