import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MatOptionModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { FormDatePickerComponent } from './components/form-date-picker/form-date-picker.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormTextAreaComponent } from './components/form-textarea/form-textarea.component';
import { DynamicFieldsDirective } from './directives/dynamic-fields.directive';

import {
  MomentDateModule,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

// TODO: managing different formats

const DATE_FORMATS_EN_GB = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    // dateInput: 'MMM DD, YYYY',
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const DATE_FORMATS_US = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    // dateInput: 'MMM DD, YYYY',
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    DynamicFieldsDirective,
    DynamicFormComponent,
    DynamicFormGroupComponent,
    FormSelectComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextAreaComponent,
    FormDatePickerComponent,
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
    MatDatepickerModule,
    MomentDateModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    // TODO: handling locale for datepicker with global settings
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS_EN_GB },
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
