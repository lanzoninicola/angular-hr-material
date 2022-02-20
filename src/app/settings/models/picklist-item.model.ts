export class PicklistItemModel {
  id: number;
  type: string;
  key: string;
  value: string;
  order: number;

  constructor(
    id: number,
    type: string,
    key: string,
    value: string,
    order: number
  ) {
    this.id = id;
    this.type = type;
    this.key = key;
    this.value = value;
    this.order = order;
  }

  getId(): number {
    return this.id;
  }

  getType(): string {
    return this.type;
  }

  getKey(): string {
    return this.key;
  }

  getValue(): string {
    return this.value;
  }

  getOrder(): number {
    return this.order;
  }
}
