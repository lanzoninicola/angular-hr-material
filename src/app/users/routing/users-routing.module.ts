import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from '../components/user-edit/user-edit.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UsersSectionComponent } from '../components/users-section/users-section.component';
import { UserEditResolver } from './user-edit.resolver';
import { UserNewResolver } from './user-new.resolver';

const usersModuleRoutes: Routes = [
  {
    path: '',
    component: UsersSectionComponent,
    children: [
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'new',
        component: UserEditComponent,
        resolve: {
          userNew: UserNewResolver,
        },
      },
      {
        path: ':id',
        component: UserEditComponent,
        resolve: {
          userEdit: UserEditResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usersModuleRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
