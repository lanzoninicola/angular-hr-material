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
import { EditFormToolbarComponent } from './components/edit-form-toolbar/edit-form-toolbar.component';
import { EditActionButtonComponent } from './components/edit-form-toolbar/edit-action-button/edit-action-button.component';
import { NavigationActionButtonComponent } from './components/edit-form-toolbar/navigation-action-button/navigation-action-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    TableDataComponent,
    LogoComponent,
    SearchControlComponent,
    EditFormToolbarComponent,
    EditActionButtonComponent,
    NavigationActionButtonComponent,
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
    EditFormToolbarComponent,
    EditActionButtonComponent,
    NavigationActionButtonComponent,
  ],
})
export class SharedModule {}
