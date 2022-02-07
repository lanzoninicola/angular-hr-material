import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { TableDataComponent } from './components/table-data/table-data.component';
import { CellComponentDirective } from './directives/cell-component.directive';
import { CellDatePipe } from './pipes/cell-date.pipe';
import { CellObjectModelPipe } from './pipes/cell-object-model.pipe';

@NgModule({
  declarations: [
    TableDataComponent,
    CellObjectModelPipe,
    CellDatePipe,
    CellComponentDirective,
  ],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [TableDataComponent],
})
export class TableDataModule {}
