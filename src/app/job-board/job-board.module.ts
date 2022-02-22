import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { JobApplicationListTableComponent } from './components/job-application-list-table/job-application-list-table.component';
import { JobApplicationListComponent } from './components/job-application-list/job-application-list.component';
import { JobidListComponent } from './components/jobid-list/jobid-list.component';
import { JobBoardSectionComponent } from './components/job-board-section/job-board-section.component';
import { JobidApplicationsComponent } from './components/jobid-edit/jobid-applications/jobid-applications.component';
import { JobidEditFormDetailsComponent } from './components/jobid-edit/jobid-edit-form-details/jobid-edit-form-details.component';
import { JobidEditFormMainComponent } from './components/jobid-edit/jobid-edit-form-main/jobid-edit-form-main.component';
import { JobidEditFormComponent } from './components/jobid-edit/jobid-edit-form/jobid-edit-form.component';
import { JobidEditComponent } from './components/jobid-edit/jobid-edit.component';
import { JobidStatusChipComponent } from './components/jobid-status-chip/jobid-status-chip.component';
import { JobBoardRoutingModule } from './routing/job-board-routing.module';
import { CandidateIdBadgeComponent } from './components/candidate-id-badge/candidate-id-badge.component';
import { JobidBadgeComponent } from './components/jobid-badge/jobid-badge.component';
import { JobApplicationEditComponent } from './components/job-application-edit/job-application-edit.component';
import { JobApplicationEditFormComponent } from './components/job-application-edit/job-application-edit-form/job-application-edit-form.component';
import { JobApplicationCandidateComponent } from './components/job-application-edit/job-application-candidate/job-application-candidate.component';

@NgModule({
  declarations: [
    JobBoardSectionComponent,
    JobidListComponent,
    JobidStatusChipComponent,
    JobidEditComponent,
    JobidEditFormComponent,
    JobidApplicationsComponent,
    JobApplicationListTableComponent,
    JobApplicationListComponent,
    JobidEditFormMainComponent,
    JobidEditFormDetailsComponent,
    CandidateIdBadgeComponent,
    JobidBadgeComponent,
    JobApplicationEditComponent,
    JobApplicationEditFormComponent,
    JobApplicationCandidateComponent,
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
