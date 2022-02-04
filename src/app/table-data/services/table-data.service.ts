import { Injectable } from '@angular/core';

import {
  ColumnConfig,
  ColumnTitle,
  DataSourceField,
  TableColumns,
} from '../types/table.types';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  tableColumnsTemplate: Map<DataSourceField, ColumnTitle | ColumnConfig> =
    new Map();

  get columnfields(): string[] {
    return Array.from(this.tableColumnsTemplate.keys());
  }

  get columnConfig(): (ColumnTitle | ColumnConfig)[] {
    return Array.from(this.tableColumnsTemplate.values());
  }

  constructor() {}

  loadColumns(columns: TableColumns) {
    Object.keys(columns).forEach((key: DataSourceField) => {
      this.addColumn(key, columns[key]);
    });
  }

  addColumn(key: DataSourceField, value: ColumnTitle | ColumnConfig) {
    this.tableColumnsTemplate.set(key, value);
  }

  destroyColumns() {
    this.tableColumnsTemplate.clear();
  }
}
