import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSectionComponent } from './components/dashboard-section/dashboard-section.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardSectionComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
