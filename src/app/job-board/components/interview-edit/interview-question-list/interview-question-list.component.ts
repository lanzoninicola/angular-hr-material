import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { InterviewService } from 'src/app/job-board/services/interview.service';
import { JobRoleQuestionModel } from 'src/app/settings/models/job-role-question.model';
import { JobRoleQuestionsService } from 'src/app/settings/services/job-role/job-role-questions.service';

//TODO: Load questions related to the interview round and not the global interview

@Component({
  selector: 'ahr-interview-question-list',
  template: `
    <div class="questions">
      <button
        mat-flat-button
        color="primary"
        (click)="onShowTechnicalQuestion()"
      >
        Load Technical Questions
      </button>
      <div class="question-list">
        <ng-container
          *ngFor="let question of questions$ | async; let i = index"
        >
          <ahr-interview-question-item
            [question]="question"
          ></ahr-interview-question-item>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./interview-question-list.component.scss'],
})
export class InterviewQuestionListComponent implements OnInit {
  questions$: Observable<JobRoleQuestionModel[]>;

  constructor(
    private _interviewService: InterviewService,
    private _jobRoleQuestions: JobRoleQuestionsService
  ) {}

  ngOnInit(): void {}

  onShowTechnicalQuestion() {
    this.questions$ = this._interviewService.stateCurrentInterview$.pipe(
      switchMap((interview) => {
        const jobRole = interview
          ?.getJobApplication()
          ?.getJobsId()
          .getJobRole();
        const roleLevel = interview
          ?.getJobApplication()
          ?.getJobsId()
          .getRoleLevel();

        if (jobRole && roleLevel) {
          return this._jobRoleQuestions.findByJobRoleAndLevel(
            jobRole,
            roleLevel
          );
        }

        return [];
      })
    );
  }
}
