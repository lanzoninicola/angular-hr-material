import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormControlConfigKey = string;

export type FormControlConfig =
  | InputTextConfig
  | InputCheckboxConfig
  | SelectConfig;

export interface InputTextConfig {
  key: string;
  type: FormControlTypeInput;
  label: string;
  placeholder: string;
  syncValidators?: any[];
  asyncValidators?: any[];
  disabled?: boolean;
  readonly?: boolean;
  style?: { [klass: string]: any };
}

type FormControlTypeInput = 'input' | 'textarea';

export interface InputCheckboxConfig {
  key: string;
  type: FormControlTypeCheckbox;
  label: string;
  syncValidators?: [];
  asyncValidators?: [];
  disabled?: boolean;
  readonly?: boolean;
}

type FormControlTypeCheckbox = 'checkbox';

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
}

export interface SelectOptionConfig {
  value: number;
  textContext: string;
}

type FormControlTypeSelect = 'select';
type PicklistType = string;
