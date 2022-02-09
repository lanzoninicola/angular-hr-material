import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[componentOutlet]',
})
export class ComponentOutletDirective implements OnInit {
  @Input('componentOutletConfig')
  componentConfig: any;

  @Input('componentOutlet')
  payload: any;

  componentRef: ComponentRef<any>;

  constructor(
    private container: ViewContainerRef,
    public template: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    if (!this.componentConfig) {
      throw 'TableCellContentDirective: Component configuration not found.';
    }

    this.componentRef = this.container.createComponent(
      this.componentConfig['key']
    );

    this._passingInputsToComponent();

    this._passingPayloadToComponent();
  }

  /**
   * @description
   * passing data to the component inputs declared in the component configuration
   */

  private _passingInputsToComponent() {
    this.componentConfig['inputs'].forEach((input: any) => {
      Object.keys(input).forEach((inputKey: string) => {
        this.componentRef.instance[inputKey] = input[inputKey];
      });
    });
  }

  /**
   * @description
   * passing the payload to component
   * If the component would consume the payload,
   * it must have an input named payload
   *
   */
  private _passingPayloadToComponent() {
    this.componentRef.instance['payload'] = this.payload;
  }
}
