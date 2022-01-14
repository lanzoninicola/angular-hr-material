import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    TablePaginatorComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent, SectionToolbarComponent, TablePaginatorComponent],
})
export class SharedModule {}
