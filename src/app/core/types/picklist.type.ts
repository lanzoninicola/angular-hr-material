export interface Picklist {
  id: number;
  type: string;
  values: PicklistValue[];
}

export type PicklistValue = string;
