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

@Directive({
  selector: '[dynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input('dynamicField')
  controlsConfig: any[];

  component: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  ngOnInit() {
    this.controlsConfig.forEach((config) => {
      console.log(config);

      const componentToRender = components[config.controlType];

      this.component = this.container.createComponent(componentToRender);
      this.component.instance.config = config;
      // this.component.instance.group = this.group;
    });
  }
}
