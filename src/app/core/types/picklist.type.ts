export interface Picklist {
  id: number;
  type: string;
  values: PicklistValues;
}

export type PicklistValues = string[];
