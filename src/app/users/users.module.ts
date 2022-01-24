import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersSectionComponent } from './components/users-section/users-section.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserListComponent, UserEditComponent, UsersSectionComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    DynamicFormModule,
  ],
})
export class UsersModule {}
