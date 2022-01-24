import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterModule } from '@angular/router';

import { NavListItemComponent } from './components/nav-list-item/nav-list-item.component';
import { NavListComponent } from './components/nav-list/nav-list.component';

@NgModule({
  declarations: [NavListItemComponent, NavListComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [NavListComponent],
})
export class NavigationModule {}
