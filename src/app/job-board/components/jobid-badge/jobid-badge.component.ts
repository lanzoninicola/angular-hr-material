import { Component, Input, OnInit } from '@angular/core';
import { JobIdModel } from '../../models/jobid.model';

@Component({
  selector: 'app-jobid-badge',
  template: `
    <div class="jobid-badge">
      <div class="title">
        <span>{{ jobid['title'] }}</span>
      </div>
      <div class="details">
        <div class="row">
          <div class="job-role">
            <span>Department:</span>
            <span>{{ jobid['department'] }}</span>
          </div>
          <div class="job-role-level">
            <span>Level:</span>
            <span>{{ jobid['jobLevel'] }}</span>
          </div>
        </div>
        <div class="row">
          <div class="requester">
            <span>Requester:</span>
            <span>{{ jobid['requester'] }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./jobid-badge.component.scss'],
})
export class JobidBadgeComponent implements OnInit {
  @Input()
  payload: JobIdModel;

  jobid = {
    title: '',
    department: '',
    jobLevel: '',
    requester: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.jobid = {
      title: this.payload.getTitle(),
      jobLevel: this.payload.roleLevel.getValue(),
      department: this.payload.getDepartment().getName(),
      requester: this.payload.getRequester().fullname,
    };
  }
}
