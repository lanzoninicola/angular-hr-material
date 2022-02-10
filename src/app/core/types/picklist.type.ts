export class PicklistModel {
  id: number;
  value: PicklistValue;
  type: string;

  constructor(id: number, value: PicklistValue, type: string) {
    this.id = id;
    this.value = value;
    this.type = type;
  }

  getId() {
    return this.id;
  }

  getValue() {
    return this.value;
  }

  getType() {
    return this.type;
  }
}

export interface Picklist {
  id: PicklistId;
  type: string;
  value: PicklistValue;
}

export type PicklistValue = string;
export type PicklistId = number;
