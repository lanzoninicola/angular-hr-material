import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ahrTableCellContent]',
})
export class TableCellContentDirective implements OnInit {
  @Input()
  ahrTableCellContentConfig: any;

  @Input('ahrTableCellContent')
  content: string;

  constructor() {}

  ngOnInit(): void {
    console.log(this.content);
    console.log(this.ahrTableCellContentConfig)
    // this.controlsConfig.forEach((config) => {
    //   const componentToRender = components[config.type];
    //   if (!componentToRender) {
    //     throw 'DynamicFieldsDirective: Component template not found.';
    //   }
    //   this.component = this.container.createComponent(componentToRender);
    //   this.component.instance.controlConfig = config;
    //   this.component.instance.parentGroupName =
    //     this.dynamicFieldsParentGroupName;
    // });
  }
}
