import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { RequestToHireEditFormComponent } from './components/request-to-hire-edit/request-to-hire-edit-form/request-to-hire-edit-form.component';
import { RequestToHireEditComponent } from './components/request-to-hire-edit/request-to-hire-edit.component';
import { RequestToHireListComponent } from './components/request-to-hire-list/request-to-hire-list.component';
import { RequestToHireSectionComponent } from './components/request-to-hire-section/request-to-hire-section.component';
import { RequestToHireRoutingModule } from './routing/request-to-hire-routing.module';

@NgModule({
  declarations: [
    RequestToHireListComponent,
    RequestToHireSectionComponent,
    RequestToHireEditComponent,
    RequestToHireEditFormComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RequestToHireRoutingModule,
    MatButtonModule,
  ],
})
export class RequestToHireModule {}
