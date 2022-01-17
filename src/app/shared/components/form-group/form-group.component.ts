import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ahr-form-group',
  template: `
    <div formGroupName="{{ name }}" class="form-group">
      <h2 class="form-group-title">{{ title }}</h2>

      <div class="form-group-content">
        <ahr-form-control
          *ngFor="let data of formControls"
          [dataSource]="data"
          [parentFormGroup]="formGroup"
        ></ahr-form-control>
      </div>
    </div>
  `,
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  title: string;
  @Input()
  formControls: any[];

  formGroup: FormGroup;

  ngOnInit() {
    console.log(this.name);
  }

  onSubmit() {}
}
