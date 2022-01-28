import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from './dynamic-form.types';

export type FormViewTemplate = Map<
  FormGroupConfiguration,
  FormControlConfiguration[]
>;
