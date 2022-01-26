import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchControlComponent } from './components/search-control/search-control.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';
import { TableDataComponent } from './components/table-data/table-data.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    TableDataComponent,
    LogoComponent,
    SearchControlComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    SectionToolbarComponent,
    TableDataComponent,
    LogoComponent,
    SearchControlComponent,
  ],
})
export class SharedModule {}
