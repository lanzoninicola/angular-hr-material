import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesSectionComponent } from './components/candidates-section/candidates-section.component';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidatesEditComponent } from './components/candidates-edit/candidates-edit.component';
import { CandidateEditComponent } from './components/candidate-edit/candidate-edit.component';
import { CandidateFormComponent } from './components/candidate-edit/candidate-form/candidate-form.component';



@NgModule({
  declarations: [
    CandidatesSectionComponent,
    CandidatesListComponent,
    CandidatesEditComponent,
    CandidateEditComponent,
    CandidateFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CandidatesModule { }
