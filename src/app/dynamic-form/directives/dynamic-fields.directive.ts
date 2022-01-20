import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { FormInputComponent } from '../components/form-input/form-input.component';
import { FormSelectComponent } from '../components/form-select/form-select.component';

const components: { [type: string]: Type<any> } = {
  input: FormInputComponent,
  select: FormSelectComponent,
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

  component: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  ngOnInit() {
    this.controlsConfig.forEach((config) => {
      console.log(config);

      const componentToRender = components[config.controlType];

      this.component = this.container.createComponent(componentToRender);
      this.component.instance.viewTemplateConfig = config;
      // this.component.instance.group = this.group;
    });
  }
}
