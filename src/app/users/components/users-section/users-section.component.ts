import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'ahr-users-section',
  templateUrl: './users-section.component.html',
  styleUrls: ['./users-section.component.scss'],
})
export class UsersSectionComponent implements OnInit {
  readonly pageTitle: string = 'Users';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['users', 'list']);
  }
}
