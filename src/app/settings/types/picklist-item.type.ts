export interface PicklistItemDTO {
  id: PicklistId;
  type: string;
  value: PicklistValue;
}

export type PicklistValue = string;
export type PicklistId = number;
