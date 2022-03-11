import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ChipComponent } from './components/chip/chip.component';
import { EditActionButtonComponent } from './components/edit-form-toolbar/edit-action-button/edit-action-button.component';
import { EditFormToolbarComponent } from './components/edit-form-toolbar/edit-form-toolbar.component';
import { NavigationActionButtonComponent } from './components/edit-form-toolbar/navigation-action-button/navigation-action-button.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogoComponent } from './components/logo/logo.component';
import { ProfileBadgeComponent } from './components/profile-badge/profile-badge.component';
import { RatingSliderComponent } from './components/rating-slider/rating-slider.component';
import { SearchControlComponent } from './components/search-control/search-control.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';
import { UserBadgeComponent } from './components/user-badge/user-badge.component';
import { RouterLoadingSpinnerComponent } from './components/router-loading-spinner/router-loading-spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SectionToolbarComponent,
    LogoComponent,
    SearchControlComponent,
    EditFormToolbarComponent,
    EditActionButtonComponent,
    NavigationActionButtonComponent,
    LoadingSpinnerComponent,
    IconComponent,
    ChipComponent,
    ProfileBadgeComponent,
    RatingSliderComponent,
    UserBadgeComponent,
    RouterLoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    SectionToolbarComponent,
    LogoComponent,
    SearchControlComponent,
    EditFormToolbarComponent,
    EditActionButtonComponent,
    NavigationActionButtonComponent,
    LoadingSpinnerComponent,
    IconComponent,
    ChipComponent,
    ProfileBadgeComponent,
    RatingSliderComponent,
    UserBadgeComponent,
    RouterLoadingSpinnerComponent,
  ],
})
export class SharedModule {}
