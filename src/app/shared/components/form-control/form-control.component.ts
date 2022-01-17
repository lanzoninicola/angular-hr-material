import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ahr-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit {
  control: AbstractControl;
  @Input()
  dataSource: any;
  @Input()
  parentFormGroup: FormGroup;

  ngOnInit() {
    this.control = this.parentFormGroup.get(this.dataSource.key);
  }
}
