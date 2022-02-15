export interface PicklistItemDTO {
  id: PicklistId;
  type: PicklistType;
  value: PicklistValue;
}

export type PicklistValue = string;
export type PicklistId = number;
export type PicklistType = string;
