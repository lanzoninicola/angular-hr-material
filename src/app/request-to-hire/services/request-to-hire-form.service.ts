import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DateService } from 'src/app/core/services/date.service';
import { EntityState } from 'src/app/core/types/entityState.type';
import { SelectOptionConfig } from 'src/app/dynamic-form/types/form-control.types';
import { PicklistModel } from 'src/app/settings/models/picklist.model';
import { BranchService } from 'src/app/settings/services/branch/branch.service';
import { DepartmentService } from 'src/app/settings/services/department/department.service';
import { JobRoleService } from 'src/app/settings/services/job-role/job-role.service';
import { PicklistService } from 'src/app/settings/services/picklist/picklist.service';

import { RequestToHireModel } from '../models/request-to-hire.model';
import { RequestToHireService } from './request-to-hire.service';

@Injectable({
  providedIn: 'root',
})
export class RequestToHireFormService {
  currentRequest: RequestToHireModel;
  currentEntityState: EntityState;

  constructor(
    private _dataService: RequestToHireService,
    private _dateService: DateService,
    private _departmentService: DepartmentService,
    private _branchService: BranchService,
    private _jobRoleService: JobRoleService,
    private _picklistService: PicklistService
  ) {
    this.currentRequest = this._dataService.store.currentRequest;
    this.currentEntityState = this._dataService.store.entityState;
  }

  get title() {
    return this.currentRequest.getTitle();
  }

  get requester() {
    return this.currentRequest.getRequester().fullname;
  }

  get createdAt() {
    return this._dateService.getDate(this.currentRequest.getCreatedAt());
  }

  get updatedAt() {
    return this._dateService.getDate(this.currentRequest.getUpdatedAt());
  }

  get status() {
    return this.currentRequest.getStatus().getId();
  }

  get highPriority() {
    return this.currentRequest.getHighPriority();
  }

  get budget() {
    return this.currentRequest.getBudget();
  }

  get jobRole() {
    return this.currentRequest.getJobRole().getId();
  }

  get department() {
    return this.currentRequest.getDepartment().getId();
  }

  get businessUnit() {
    return this.currentRequest.getBusinessUnit().getId();
  }

  get employmentsStatus() {
    return this.currentRequest.getEmploymentStatus().getId();
  }

  get roleTaskDescription() {
    return this.currentRequest.getRoleTaskDescription();
  }

  get minimumQualifications() {
    return this.currentRequest.getMinimumQualifications();
  }

  get preferredQualifications() {
    return this.currentRequest.getPreferredQualifications();
  }

  get roleLevel() {
    return this.currentRequest.getRoleLevel().getId();
  }

  get jobLocationType() {
    return this.currentRequest.getJobLocationType().getId();
  }

  get jobLocation() {
    return this.currentRequest.getJobLocation().getId();
  }

  get benefits() {
    return this.currentRequest.getBenefits();
  }

  get additionalNotes() {
    return this.currentRequest.getAdditionalNotes();
  }

  get specialCategoriesOpened() {
    return this.currentRequest.getSpecialCategoriesOpened();
  }

  reset() {
    this._dataService.store.currentRequestReset();
    this._dataService.store.entityStateReset();
  }
}
