import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableDataComponent } from './components/table-data/table-data.component';

@NgModule({
  declarations: [TableDataComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [TableDataComponent],
})
export class TableDataModule {}
