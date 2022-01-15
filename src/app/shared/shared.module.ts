import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    TablePaginatorComponent,
    TableDataComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    SectionToolbarComponent,
    TablePaginatorComponent,
    TableDataComponent,
  ],
})
export class SharedModule {}
