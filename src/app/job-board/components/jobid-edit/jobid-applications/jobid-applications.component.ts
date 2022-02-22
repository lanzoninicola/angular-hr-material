import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { JobsApplicationsCollection } from 'src/app/job-board/models/job-application.collection';
import { JobApplicationModel } from 'src/app/job-board/models/job-application.model';
import { JobIdModel } from 'src/app/job-board/models/job-id.model';
import { JobApplicationsService } from 'src/app/job-board/services/job-applications.service';

@Component({
  selector: 'ahr-jobid-applications',
  template: `
    <ahr-job-applications-list-table
      [tableDataSource$]="tableDataSource$"
    ></ahr-job-applications-list-table>
  `,
})
export class JobidApplicationsComponent implements OnInit {
  @Input()
  jobId: JobIdModel;

  tableDataSource$: Observable<JobApplicationModel[]>;

  constructor(private _dataService: JobApplicationsService) {}

  ngOnInit(): void {
    this.tableDataSource$ = this._dataService.findByJobId(this.jobId).pipe(
      map<JobsApplicationsCollection, JobApplicationModel[]>((collection) => {
        return collection.getItems();
      })
    );
  }
}
