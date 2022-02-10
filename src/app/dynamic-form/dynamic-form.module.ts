import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../shared/shared.module';
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldsDirective } from './directives/dynamic-fields.directive';
import { FormTextAreaComponent } from './components/form-textarea/form-textarea.component';

@NgModule({
  declarations: [
    DynamicFieldsDirective,
    DynamicFormComponent,
    DynamicFormGroupComponent,
    FormSelectComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextAreaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatOptionModule,
    MatCheckboxModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
