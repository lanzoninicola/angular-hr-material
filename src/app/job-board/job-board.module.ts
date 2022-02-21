import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { JobApplicationsListTableComponent } from './components/job-applications-list-table/job-applications-list-table.component';
import { JobApplicationsListComponent } from './components/job-applications-list/job-applications-list.component';
import { JobBoardListComponent } from './components/job-board-list/job-board-list.component';
import { JobBoardSectionComponent } from './components/job-board-section/job-board-section.component';
import { JobidApplicationsComponent } from './components/jobid-edit/jobid-applications/jobid-applications.component';
import { JobidEditFormComponent } from './components/jobid-edit/jobid-edit-form/jobid-edit-form.component';
import { JobidEditComponent } from './components/jobid-edit/jobid-edit.component';
import { JobidStatusChipComponent } from './components/jobid-status-chip/jobid-status-chip.component';
import { JobBoardRoutingModule } from './routing/job-board-routing.module';
import { JobBoardApplicationsListComponent } from './components/job-board-applications-list/job-board-applications-list.component';

@NgModule({
  declarations: [
    JobBoardSectionComponent,
    JobBoardListComponent,
    JobidStatusChipComponent,
    JobidEditComponent,
    JobidEditFormComponent,
    JobidApplicationsComponent,
    JobApplicationsListComponent,
    JobApplicationsListTableComponent,
    JobBoardApplicationsListComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    JobBoardRoutingModule,
    MatButtonModule,
    TableDataModule,
    DynamicFormModule,
    MatTabsModule,
  ],
})
export class JobBoardModule {}
