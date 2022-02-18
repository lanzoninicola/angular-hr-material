import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { JobBoardListComponent } from './components/job-board-list/job-board-list.component';
import { JobBoardSectionComponent } from './components/job-board-section/job-board-section.component';
import { JobidEditFormComponent } from './components/jobid-edit/jobid-edit-form/jobid-edit-form.component';
import { JobidEditComponent } from './components/jobid-edit/jobid-edit.component';
import { JobidStatusChipComponent } from './components/jobid-status-chip/jobid-status-chip.component';
import { JobBoardRoutingModule } from './routing/job-board-routing.module';

@NgModule({
  declarations: [
    JobBoardSectionComponent,
    JobBoardListComponent,
    JobidStatusChipComponent,
    JobidEditComponent,
    JobidEditFormComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    JobBoardRoutingModule,
    MatButtonModule,
    TableDataModule,
    DynamicFormModule,
    MatExpansionModule,
  ],
})
export class JobBoardModule {}
