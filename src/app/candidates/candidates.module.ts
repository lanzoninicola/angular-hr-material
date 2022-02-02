import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CoreModule } from '../core/core.module';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { SharedModule } from '../shared/shared.module';
import { TableDataModule } from '../table-data/table-data.module';
import { CandidateEditFormComponent } from './components/candidate-edit/candidate-edit-form/candidate-edit-form.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesSectionComponent } from './components/candidates-section/candidates-section.component';
import { CandidatesRoutingModule } from './routing/candidates-routing.module';

@NgModule({
  declarations: [
    CandidatesSectionComponent,
    CandidatesListComponent,
    CandidateEditComponent,
    CandidateEditFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    CandidatesRoutingModule,
    DynamicFormModule,
    MatButtonModule,
    TableDataModule,
  ],
})
export class CandidatesModule {}
