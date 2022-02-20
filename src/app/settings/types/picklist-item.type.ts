export interface PicklistItemDTO {
  id: PicklistId;
  type: PicklistType;
  key: string;
  value: PicklistValue;
  order: number;
}

export type PicklistValue = string;
export type PicklistId = number;
export type PicklistType = string;
