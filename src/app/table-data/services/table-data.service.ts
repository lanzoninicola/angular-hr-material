import { Injectable } from '@angular/core';

import { DataSourceField, TableColumnConfig } from '../types/table.types';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  tableColumnsTemplate: Map<DataSourceField, TableColumnConfig> = new Map();

  get columnfields(): string[] {
    return Array.from(this.tableColumnsTemplate.keys());
  }

  get columnConfig(): TableColumnConfig[] {
    return Array.from(this.tableColumnsTemplate.values());
  }

  constructor() {}

  loadColumns(columns: TableColumnConfig[]) {
    columns.forEach((column: TableColumnConfig) => {
      this.addColumn(column['key'], column);
    });
  }

  addColumn(key: DataSourceField, value: TableColumnConfig) {
    this.tableColumnsTemplate.set(key, value);
  }

  destroyColumns() {
    this.tableColumnsTemplate.clear();
  }
}
