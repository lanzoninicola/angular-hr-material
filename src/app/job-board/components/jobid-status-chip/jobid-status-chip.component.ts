import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { JobIdStatus } from '../../types/jobid.dto.type';

@Component({
  selector: 'app-request-status-chip',
  template: `<ahr-chip [label]="label" [cssClasses]="[label]"></ahr-chip>`,
  styleUrls: ['./jobid-status-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobidStatusChipComponent implements OnInit {
  @Input()
  payload: any;

  label: JobIdStatus;

  constructor() {}

  ngOnInit(): void {
    this.label = this.payload.value;
  }
}
