import { Component, Input, OnInit } from '@angular/core';
import { JobRoleQuestionModel } from 'src/app/settings/models/job-role-question.model';

//TODO: tracking the result of Q&A

@Component({
  selector: 'ahr-interview-question-item',
  templateUrl: './interview-question-item.component.html',
  styleUrls: ['./interview-question-item.component.scss'],
})
export class InterviewQuestionItemComponent implements OnInit {
  @Input()
  question: JobRoleQuestionModel;

  constructor() {}

  ngOnInit(): void {}

  // acceptAnswer(id: number) {
  //   console.log('accept answer');
  // }

  // rejectAnswer(id: number) {
  //   console.log('reject answer');
  // }
}
