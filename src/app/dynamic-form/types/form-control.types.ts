import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormControlConfigKey = string;

export type FormControlConfig =
  | InputTextConfig
  | InputCheckboxConfig
  | SelectConfig
  | InputDateConfig;

export interface InputTextConfig {
  key: string;
  type: FormControlTypeInput;
  format?: FormControlInputFormat;
  label: string;
  placeholder: string;
  syncValidators?: any[];
  asyncValidators?: any[];
  disabled?: boolean;
  readonly?: boolean;
  style?: { [klass: string]: any };
  hidden?: boolean;
}

type FormControlTypeInput = 'input' | 'textarea';
type FormControlInputFormat =
  | 'text'
  | 'color'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';

export interface InputCheckboxConfig {
  key: string;
  type: FormControlTypeCheckbox;
  label: string;
  syncValidators?: [];
  asyncValidators?: [];
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
}

type FormControlTypeCheckbox = 'checkbox';

export interface InputDateConfig {
  key: string;
  type: FormControlTypeDate;
  label: string;
  placeholder: string;
  syncValidators?: any[];
  asyncValidators?: any[];
  disabled?: boolean;
  readonly?: boolean;
  style?: { [klass: string]: any };
  hidden?: boolean;
}

type FormControlTypeDate = 'date';

export interface SelectConfig {
  key: string;
  type: FormControlTypeSelect;
  label: string;
  placeholder: string;
  whatToSelect: string;
  options?: Observable<SelectOptionConfig[]>;
  syncValidators?: ValidationErrors;
  asyncValidators?: [];
  disabled?: boolean;
  hidden?: boolean;
  showOptionDescription?: boolean;
}

export interface SelectOptionConfig {
  value: number | object;
  textContext: string;
  description?: string;
}

type FormControlTypeSelect = 'select';
