import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { RTHStatus } from '../../types/request-to-hire.type';

@Component({
  selector: 'app-request-status-chip',
  template: `<ahr-chip [label]="label" [cssClasses]="[label]"></ahr-chip>`,
  styleUrls: ['./request-status-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestStatusChipComponent implements OnInit {
  @Input()
  payload: any;

  label: RTHStatus;

  constructor() {}

  ngOnInit(): void {
    this.label = this.payload;
  }
}
