import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { CandidatesModule } from '../candidates/candidates.module';
import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { CandidateIdBadgeComponent } from './components/candidate-id-badge/candidate-id-badge.component';
import { JobApplicationActivityNewComponent } from './components/job-application-activity-new/job-application-activity-new.component';
import { JobApplicationEditComponent } from './components/job-application-edit/job-application-edit.component';
import { JobApplicationJobidFormComponent } from './components/job-application-edit/job-application-jobid-form/job-application-jobid-form.component';
import { JobApplicationStatusFormComponent } from './components/job-application-edit/job-application-status-form/job-application-status-form.component';
import { JobApplicationListTableComponent } from './components/job-application-list-table/job-application-list-table.component';
import { JobApplicationListComponent } from './components/job-application-list/job-application-list.component';
import { JobBoardSectionComponent } from './components/job-board-section/job-board-section.component';
import { JobidBadgeComponent } from './components/jobid-badge/jobid-badge.component';
import { JobidApplicationsComponent } from './components/jobid-edit/jobid-applications/jobid-applications.component';
import { JobidEditFormDetailsComponent } from './components/jobid-edit/jobid-edit-form-details/jobid-edit-form-details.component';
import { JobidEditFormMainComponent } from './components/jobid-edit/jobid-edit-form-main/jobid-edit-form-main.component';
import { JobidEditFormComponent } from './components/jobid-edit/jobid-edit-form/jobid-edit-form.component';
import { JobidEditComponent } from './components/jobid-edit/jobid-edit.component';
import { JobidListComponent } from './components/jobid-list/jobid-list.component';
import { JobidStatusChipComponent } from './components/jobid-status-chip/jobid-status-chip.component';
import { JobBoardRoutingModule } from './routing/job-board-routing.module';
import { JobApplicationActivitiesFormComponent } from './components/job-application-edit/job-application-activities-form/job-application-activities-form.component';
import { ActivityFormComponent } from './components/job-application-edit/job-application-activities-form/activity-form/activity-form.component';

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
    JobApplicationStatusFormComponent,
    JobApplicationJobidFormComponent,
    JobApplicationActivityNewComponent,
    JobApplicationActivitiesFormComponent,
    ActivityFormComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    JobBoardRoutingModule,
    MatButtonModule,
    TableDataModule,
    DynamicFormModule,
    MatTabsModule,
    CandidatesModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class JobBoardModule {}
