import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-interview-round-details',
  template: `
    <div class="interview-round-details-body">
      <mat-tab-group animationDuration="0ms">
        <mat-tab label="Feedbacks">
          <div class="tab-content-wrapper">
            <ahr-interview-feedback-list></ahr-interview-feedback-list>
          </div>
        </mat-tab>
        <mat-tab label="Technical Interview">
          <div class="tab-content-wrapper">
            <ahr-interview-question-list></ahr-interview-question-list>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrls: ['./interview-round-details.component.scss'],
})
export class InterviewRoundDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
