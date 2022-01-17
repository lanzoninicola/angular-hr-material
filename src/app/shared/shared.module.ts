import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import { FormControlComponent } from './components/form-control/form-control.component';
import { FormComponent } from './components/form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { FormGroupComponent } from './components/form-group/form-group.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    TablePaginatorComponent,
    TableDataComponent,
    FormComponent,
    FormControlComponent,
    FormGroupComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule,
  ],
  exports: [
    HeaderComponent,
    SectionToolbarComponent,
    TablePaginatorComponent,
    TableDataComponent,
    FormComponent,
  ],
})
export class SharedModule {}
