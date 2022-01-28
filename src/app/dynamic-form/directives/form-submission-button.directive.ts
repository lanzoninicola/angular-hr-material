import { Directive, HostListener } from '@angular/core';

import { DynamicFormService } from '../services/dynamic-form.service';

@Directive({
  selector: '[ahrFormSubmit]',
})
export class FormSubmissionButtonDirective {
  @HostListener('click') onSubmit() {
    this._dynamicForm.formState$.next('submitting');
  }

  constructor(private _dynamicForm: DynamicFormService) {}
}
