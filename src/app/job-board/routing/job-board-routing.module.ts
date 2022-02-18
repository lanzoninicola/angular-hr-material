import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobBoardListComponent } from '../components/job-board-list/job-board-list.component';
import { JobBoardSectionComponent } from '../components/job-board-section/job-board-section.component';
import { JobidEditComponent } from '../components/jobid-edit/jobid-edit.component';
import { JobidEditResolver } from './jobid-edit.resolver';
import { JobidFormResolver } from './jobid-form.resolver';
import { JobidNewResolver } from './jobid-new.resolver';

const moduleRoutes: Routes = [
  {
    path: '',
    component: JobBoardSectionComponent,
    children: [
      {
        path: 'list',
        component: JobBoardListComponent,
      },
      {
        path: 'new',
        component: JobidEditComponent,
        resolve: {
          newEntity: JobidNewResolver,
          formControlsData: JobidFormResolver,
        },
      },
      {
        path: ':id',
        component: JobidEditComponent,
        resolve: {
          entity: JobidEditResolver,
          formControlsData: JobidFormResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule],
})
export class JobBoardRoutingModule {}
