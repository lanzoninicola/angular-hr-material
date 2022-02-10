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
  value: string;
  syncValidators?: any[];
  asyncValidators?: any[];
}

type FormControlTypeInput = 'input' | 'textarea';

export interface InputCheckboxConfig {
  key: string;
  type: FormControlTypeCheckbox;
  label: string;
  value: boolean;
  syncValidators?: [];
  asyncValidators?: [];
}

type FormControlTypeCheckbox = 'checkbox';

export interface SelectConfig {
  key: string;
  type: FormControlTypeSelect;
  label: string;
  placeholder: string;
  whatToSelect: string;
  value?: string[];
  syncValidators?: [];
  asyncValidators?: [];
}

type FormControlTypeSelect = 'select';
