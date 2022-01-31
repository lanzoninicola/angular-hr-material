import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { UserEditFormComponent } from './components/user-edit/user-edit-form/user-edit-form.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersSectionComponent } from './components/users-section/users-section.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UsersSectionComponent,
    UserEditFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    DynamicFormModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
})
export class UsersModule {}
