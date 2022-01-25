import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'ahr-users-section',
  templateUrl: './users-section.component.html',
  styleUrls: ['./users-section.component.scss'],
})
export class UsersSectionComponent implements OnInit {
  readonly pageTitle: string = 'Users';
  constructor(private router: Router, private _usersService: UsersService) {}

  addNewUser() {
    console.log('yeaaaa new user created');
  }

  ngOnInit(): void {
    this.router.navigate(['users', 'list']);
  }
}
