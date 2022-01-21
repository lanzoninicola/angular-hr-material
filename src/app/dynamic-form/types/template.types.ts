import {
  FormControlConfiguration,
  FormGroupConfiguration,
} from './dynamic-form.types';

export type TemplateMap = Map<
  FormGroupConfiguration,
  FormControlConfiguration[]
>;
