import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntityState } from 'src/app/core/types/entityState.type';
import { DynamicFormService } from 'src/app/dynamic-form/services/dynamic-form.service';
import { JobIdModel } from '../../models/job-id.model';
import { JobBoardService } from '../../services/job-board.service';
import { JobIdFormData } from '../../types/jobid.form.type';

@Component({
  selector: 'app-jobid-edit',
  templateUrl: './jobid-edit.component.html',
  styleUrls: ['./jobid-edit.component.scss'],
})
export class JobidEditComponent implements OnInit {
  private subs = new Subscription();
  currentJobId: JobIdModel;
  entityState: EntityState = 'create';

  formState$ = this._dynamicForm.formState$;
  formStatus$: Observable<any>;
  formData: JobIdFormData;

  constructor(
    private _dynamicForm: DynamicFormService,
    private _dataService: JobBoardService
  ) {}

  ngOnInit() {
    this.entityState = this._dataService.store.entityState;
    this.currentJobId = this._dataService.store.currentJobId;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onValueChanges(valueChanges: Observable<any>) {
    this.subs.add(
      valueChanges.subscribe((formData: JobIdFormData) => {
        this.formData = formData;
      })
    );
  }

  onStatusChanges(statusChanges: Observable<any>) {
    this.formStatus$ = statusChanges;
  }

  onSaveButtonClicked() {
    this.currentJobId = this._dataService.getEntityModelFromFormData(
      this.formData
    );

    if (this.entityState === 'create') {
      this._dataService.save(this.currentJobId);
    }
    if (this.entityState === 'update') {
      this._dataService.update(this.currentJobId);
    }
  }

  // TODO: Develop remove user
  onRemoveButtonClicked() {}
}
