import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateEditComponent } from '../components/candidate-edit/candidate-edit.component';
import { CandidatesListComponent } from '../components/candidates-list/candidates-list.component';
import { CandidatesSectionComponent } from '../components/candidates-section/candidates-section.component';

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
          //   userNew: UserNewResolver,
        },
      },
      {
        path: ':id',
        component: CandidateEditComponent,
        resolve: {
          //   userEdit: UserEditResolver,
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
