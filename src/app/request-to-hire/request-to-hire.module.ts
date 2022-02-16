import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { RequestStatusChipComponent } from './components/request-status-chip/request-status-chip.component';
import { RequestToHireEditFormComponent } from './components/request-to-hire-edit/request-to-hire-edit-form/request-to-hire-edit-form.component';
import { RequestToHireEditComponent } from './components/request-to-hire-edit/request-to-hire-edit.component';
import { RequestToHireListComponent } from './components/request-to-hire-list/request-to-hire-list.component';
import { RequestToHireSectionComponent } from './components/request-to-hire-section/request-to-hire-section.component';
import { RequestToHireRoutingModule } from './routing/request-to-hire-routing.module';
import { HighPriorityIconComponent } from './components/high-priority-icon/high-priority-icon.component';

@NgModule({
  declarations: [
    RequestToHireListComponent,
    RequestToHireSectionComponent,
    RequestToHireEditComponent,
    RequestToHireEditFormComponent,
    RequestStatusChipComponent,
    HighPriorityIconComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RequestToHireRoutingModule,
    MatButtonModule,
    TableDataModule,
    DynamicFormModule,
  ],
})
export class RequestToHireModule {}
