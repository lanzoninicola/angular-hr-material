import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidateEditComponent } from '../components/candidate-edit/candidate-edit.component';
import { CandidatesListComponent } from '../components/candidates-list/candidates-list.component';
import { CandidatesSectionComponent } from '../components/candidates-section/candidates-section.component';
import { CandidateEditResolver } from './candidate-edit.resolver';
import { CandidateNewResolver } from './candidate-new.resolver';

const candidatesModuleRoutes: Routes = [
  {
    path: '',
    component: CandidatesSectionComponent,
    children: [
      {
        path: 'list',
        component: CandidatesListComponent,
      },
      {
        path: 'new',
        component: CandidateEditComponent,
        resolve: {
          userNew: CandidateNewResolver,
        },
      },
      {
        path: ':id',
        component: CandidateEditComponent,
        resolve: {
          userEdit: CandidateEditResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(candidatesModuleRoutes)],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
