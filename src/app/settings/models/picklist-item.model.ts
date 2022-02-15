export class PicklistItemModel {
  id: number;
  type: string;
  value: string;

  constructor(id: number, type: string, value: string) {
    this.id = id;
    this.type = type;
    this.value = value;
  }

  getId(): number {
    return this.id;
  }
  getType(): string {
    return this.type;
  }
  getValue(): string {
    return this.value;
  }
}
