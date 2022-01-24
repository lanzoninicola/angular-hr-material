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
