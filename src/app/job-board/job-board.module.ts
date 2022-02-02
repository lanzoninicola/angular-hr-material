import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobBoardSectionComponent } from './components/job-board-section/job-board-section.component';
import { JobBoardListComponent } from './components/job-board-list/job-board-list.component';
import { JobBoardEditComponent } from './components/job-board-edit/job-board-edit.component';
import { JobBoardEditFormComponent } from './components/job-board-edit/job-board-edit-form/job-board-edit-form.component';



@NgModule({
  declarations: [
    JobBoardSectionComponent,
    JobBoardListComponent,
    JobBoardEditComponent,
    JobBoardEditFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobBoardModule { }
