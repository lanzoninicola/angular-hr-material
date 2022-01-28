import { Directive, HostListener } from '@angular/core';
import { DynamicFormBuilderService } from '../services/dynamic-form-builder.service';

@Directive({
  selector: '[ahrFormSubmit]',
})
export class FormSubmissionButtonDirective {
  @HostListener('click') onSubmit() {
    this._dynamicFormBuilder.formState$.next('submitting');
  }

  constructor(private _dynamicFormBuilder: DynamicFormBuilderService) {}
}
