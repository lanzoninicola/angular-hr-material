import { Component, Input, OnInit } from '@angular/core';
import { CandidateModel } from 'src/app/candidates/models/candidate.model';

@Component({
  selector: 'app-candidate-id-badge',
  template: `
    <ahr-profile-badge [profileData]="profileData"></ahr-profile-badge>
  `,
  styleUrls: ['./candidate-id-badge.component.scss'],
})
export class CandidateIdBadgeComponent implements OnInit {
  @Input()
  payload: CandidateModel;

  profileData = {
    lastname: '',
    firstname: '',
    email: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.profileData = {
      lastname: this.payload.getLastname(),
      firstname: this.payload.getFirstname(),
      email: this.payload.getEmail(),
    };
  }
}
