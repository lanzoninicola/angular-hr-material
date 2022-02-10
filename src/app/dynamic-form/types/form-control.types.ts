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
  initialValue: string;
  syncValidators?: any[];
  asyncValidators?: any[];
}

type FormControlTypeInput = 'input' | 'textarea';

export interface InputCheckboxConfig {
  key: string;
  type: FormControlTypeCheckbox;
  label: string;
  initialValue: boolean;
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
  initialValue: string | null;
  options?: SelectOptionConfig[];
  picklistType?: PicklistType | null;
  syncValidators?: [];
  asyncValidators?: [];
}

export interface SelectOptionConfig {
  value: number;
  textContext: string;
}

type FormControlTypeSelect = 'select';
type PicklistType = string;
