import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CoreModule } from '../core/core.module';
import { TableDataComponent } from './components/table-data/table-data.component';

@NgModule({
  declarations: [TableDataComponent],
  imports: [CommonModule, CoreModule, MatTableModule, MatPaginatorModule],
  exports: [TableDataComponent],
})
export class TableDataModule {}
