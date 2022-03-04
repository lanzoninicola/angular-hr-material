import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { SettingsSectionComponent } from './components/settings-section/settings-section.component';
import { SettingsRoutingModule } from './routing/settings-routing.module';

@NgModule({
  declarations: [SettingsSectionComponent, SettingsListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    CoreModule,
    SharedModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {}
