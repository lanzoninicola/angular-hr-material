import { Injectable } from '@angular/core';
import { HighlightSpanKind } from 'typescript';

import {
  ColumnTitle,
  DataSourceField,
  TableColumns,
} from '../types/table.types';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  tableColumnsTemplate: Map<DataSourceField, ColumnTitle> = new Map();

  get columnfields(): string[] {
    return Array.from(this.tableColumnsTemplate.keys());
  }

  get columnTitles(): string[] {
    return Array.from(this.tableColumnsTemplate.values());
  }

  constructor() {}

  loadColumns(columns: TableColumns) {
    Object.keys(columns).forEach((key: DataSourceField) => {
      this.addColumn(key, columns[key]);
    });
  }

  addColumn(key: DataSourceField, value: ColumnTitle) {
    this.tableColumnsTemplate.set(key, value);
  }

  destroyColumns() {
    this.tableColumnsTemplate.clear();
  }
}
