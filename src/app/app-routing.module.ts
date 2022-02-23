import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => {
        return m.DashboardModule;
      }),
  },
  // {
  //   path: 'users',
  //   loadChildren: () =>
  //     import('./users/users.module').then((m) => {
  //       return m.UsersModule;
  //     }),
  // },
  {
    path: 'candidates',
    loadChildren: () =>
      import('./candidates/candidates.module').then((m) => {
        return m.CandidatesModule;
      }),
  },
  // {
  //   path: 'request-to-hire',
  //   loadChildren: () =>
  //     import('./request-to-hire/request-to-hire.module').then((m) => {
  //       return m.RequestToHireModule;
  //     }),
  // },
  {
    path: 'job-board',
    loadChildren: () =>
      import('./job-board/job-board.module').then((m) => {
        return m.JobBoardModule;
      }),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
