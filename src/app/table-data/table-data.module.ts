import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { TableDataComponent } from './components/table-data/table-data.component';
import { CellValuePipe } from './pipes/cell-value.pipe';
import { TableDataCellDatePipe } from './pipes/table-data-cell-date.pipe';

@NgModule({
  declarations: [TableDataComponent, CellValuePipe, TableDataCellDatePipe],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [TableDataComponent],
})
export class TableDataModule {}
