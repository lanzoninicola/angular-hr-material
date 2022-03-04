import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from '../components/settings-list/settings-list.component';
import { SettingsSectionComponent } from '../components/settings-section/settings-section.component';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsSectionComponent,
    children: [
      {
        path: 'global',
        component: SettingsListComponent,
      },
      {
        path: 'job-role',
        component: SettingsListComponent,
      },
      {
        path: 'picklist',
        component: SettingsListComponent,
      },
      {
        path: 'department',
        component: SettingsListComponent,
      },
      {
        path: 'branch',
        component: SettingsListComponent,
      },
      {
        path: 'board-template',
        component: SettingsListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
