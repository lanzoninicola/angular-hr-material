import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestToHireEditComponent } from '../components/request-to-hire-edit/request-to-hire-edit.component';
import { RequestToHireListComponent } from '../components/request-to-hire-list/request-to-hire-list.component';
import { RequestToHireSectionComponent } from '../components/request-to-hire-section/request-to-hire-section.component';
import { RequestEditResolver } from './request-edit.resolver';
import { RequestFormResolver } from './request-form.resolver';
import { RequestNewResolver } from './request-new.resolver';

const moduleRoutes: Routes = [
  {
    path: '',
    component: RequestToHireSectionComponent,
    children: [
      {
        path: 'list',
        component: RequestToHireListComponent,
      },
      {
        path: 'new',
        component: RequestToHireEditComponent,
        resolve: {
          newEntity: RequestNewResolver,
          formControlsData: RequestFormResolver,
        },
      },
      {
        path: ':id',
        component: RequestToHireEditComponent,
        resolve: {
          entity: RequestEditResolver,
          formControlsData: RequestFormResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule],
})
export class RequestToHireRoutingModule {}
