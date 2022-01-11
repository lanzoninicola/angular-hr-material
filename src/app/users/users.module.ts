import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    UsersRoutingModule,
  ],
})
export class UsersModule {}
