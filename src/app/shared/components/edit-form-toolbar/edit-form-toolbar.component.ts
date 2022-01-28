import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-edit-form-toolbar',
  template: `
    <div class="editFormToolbar">
      <div class="editFormWrapper">
        <div class="col-1">
          <ng-content select="[left]"></ng-content>
        </div>
        <div class="col-2">
          <ng-content select="[right]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./edit-form-toolbar.component.scss'],
})
export class EditFormToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
