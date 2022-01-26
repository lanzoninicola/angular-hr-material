import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { UserModel } from '../../types/user.type';

@Component({
  selector: 'ahr-user-edit',
  template: `
    <div class="container">
      <ahr-user-edit-form [user]="user$ | async"></ahr-user-edit-form>
    </div>
  `,
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(
    {} as UserModel
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userResolved = this.route.snapshot.data['userEdit'];

    if (userResolved) {
      this.user$.next(userResolved);
    }
  }
}
