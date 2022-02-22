import { Type } from '@angular/core';

export type ColumnTitle = string;
export type DataSourceField = string;

export type ComponentType = 'component';

export interface TableColumnConfig {
  key: DataSourceField;
  title: ColumnTitle;
  type?: string;
  viewType?: ComponentType;
  objectProp?: string | string[];
  component?: {
    key: Type<any>;
    inputs?: {}[];
  };
  headerStyle?: {};
  cellStyle?: {};
  sortable?: boolean;
}

export interface TableDataCell {
  content: string;
}
