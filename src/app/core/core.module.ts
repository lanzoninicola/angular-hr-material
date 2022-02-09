import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StringifyPipe } from './pipes/stringify.pipe';
import { ComponentOutletDirective } from './directives/component-outlet.directive';

@NgModule({
  declarations: [StringifyPipe, ComponentOutletDirective],
  imports: [CommonModule, MatToolbarModule, MatSnackBarModule],
  exports: [StringifyPipe, ComponentOutletDirective],
})
export class CoreModule {}
