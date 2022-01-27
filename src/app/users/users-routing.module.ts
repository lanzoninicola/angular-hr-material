import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UsersSectionComponent } from './components/users-section/users-section.component';
import { UserEditFormInitResolver } from './routing/user-edit-form-init.resolver';
import { UserEditResolver } from './routing/user-edit.resolver';
import { UserNewResolver } from './routing/user-new.resolver';

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

// TODO: Handle Not Found route eg. hostname/users/99999 (the user with ID 99999 doesn't exists)
