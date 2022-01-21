export interface FormGroupConfiguration {
  key: string;
  title: string;
  description?: string;
}

// TODO: verify how to replace any
export interface FormControlConfiguration {
  [key: string]: any;
}

type FormControlsConfig = InputTextConfig | SelectConfig;

export interface InputTextConfig {
  key: string;
  type: FormControlTypeInput;
  label: string;
  placeholder: string;
  value: string;
  syncValidators: [];
  asyncValidators?: [];
}

type FormControlTypeInput = 'input';

export interface SelectConfig {
  key: string;
  type: FormControlTypeSelect;
  label: string;
  placeholder: string;
  whatToSelect: string;
  selectOptions: string[];
  syncValidators?: [];
  asyncValidators?: [];
}

type FormControlTypeSelect = 'select';
