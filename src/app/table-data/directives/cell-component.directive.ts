import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[tdCellComponent]',
})
export class CellComponentDirective implements OnInit {
  @Input('component')
  componentToRender: Type<any>;

  component: ComponentRef<any>;

  constructor(private container: ViewContainerRef) {}

  ngOnInit(): void {
    this.component = this.container.createComponent(this.componentToRender);
    // this.component.instance.controlConfig = config;
  }
}
