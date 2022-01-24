import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const dashboardModuleRoutes: Routes = [
  {
    path: '',
    component: DashboardSectionComponent,
    children: [
      {
        path: 'list',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardModuleRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
