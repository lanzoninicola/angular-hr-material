import { Type } from '@angular/core';

export type TableColumns = {
  [key: DataSourceField]: ColumnConfig;
};

export type ColumnTitle = string;
export type DataSourceField = string;
export type ColumnConfig = {
  title: string;
  field?: string;
  component?: Type<any>;
};
