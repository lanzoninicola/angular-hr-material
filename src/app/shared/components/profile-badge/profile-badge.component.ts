import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ahr-profile-badge',
  template: `
    <div class="profile-badge">
      <div class="identity-info">
        <span>{{ profileData.lastname }}</span>
        <span>{{ profileData.firstname }}</span>
      </div>
      <div class="biz-info">
        <span>{{ profileData.email }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./profile-badge.component.scss'],
})
export class ProfileBadgeComponent implements OnInit {
  @Input()
  profileData: {
    lastname: string;
    firstname: string;
    email: string;
  };

  constructor() {}

  ngOnInit(): void {}
}
