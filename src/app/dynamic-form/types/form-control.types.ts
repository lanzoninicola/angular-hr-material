export interface FormControlModelConfig {
  initState: string;
  syncValidators: [];
  asyncValidators?: [];
}

export type FormControlKey = string;

export interface FormControlInputTextConfig {
  key: string;
  type: FormControlTypeInput;
  label: string;
  placeholder: string;
  value: string;
  syncValidators: [];
  asyncValidators?: [];
}

type FormControlTypeInput = 'input';
