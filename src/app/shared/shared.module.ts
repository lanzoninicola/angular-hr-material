import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './components/header/header.component';
import { SectionToolbarComponent } from './components/section-toolbar/section-toolbar.component';

@NgModule({
  declarations: [HeaderComponent, SectionToolbarComponent],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [HeaderComponent, SectionToolbarComponent],
})
export class SharedModule {}
