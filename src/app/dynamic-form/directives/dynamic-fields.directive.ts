import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormCheckboxComponent } from '../components/form-checkbox/form-checkbox.component';
import { FormDatePickerComponent } from '../components/form-date-picker/form-date-picker.component';

import { FormInputComponent } from '../components/form-input/form-input.component';
import { FormSelectComponent } from '../components/form-select/form-select.component';
import { FormTextAreaComponent } from '../components/form-textarea/form-textarea.component';

const COMPONENTS: { [type: string]: Type<any> } = {
  input: FormInputComponent,
  textarea: FormTextAreaComponent,
  checkbox: FormCheckboxComponent,
  select: FormSelectComponent,
  date: FormDatePickerComponent,
};

/**
 * Directive responsible to render the component of requested form
 */

@Directive({
  selector: '[dynamicFields]',
})
export class DynamicFieldsDirective implements OnInit {
  @Input('dynamicFields')
  controlsConfig: any[];

  @Input('dynamicFieldsParentGroupName')
  parentGroupName: string;

  component: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  ngOnInit() {
    this.controlsConfig.forEach((config) => {
      const componentToRender = COMPONENTS[config.type];

      if (!componentToRender) {
        throw 'DynamicFieldsDirective: Component template not found.';
      }

      this.component = this.container.createComponent(componentToRender);
      this.component.instance.controlConfig = config;
      this.component.instance.parentGroupName = this.parentGroupName;
    });
  }
}
