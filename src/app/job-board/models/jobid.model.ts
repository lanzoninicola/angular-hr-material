import { RequestToHireModel } from 'src/app/request-to-hire/models/request-to-hire.model';
import { BoardTemplateModel } from 'src/app/settings/models/board-template.model';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { PicklistItemModel } from 'src/app/settings/models/picklist-item.model';
import { UserModel } from 'src/app/users/models/user.model';

export class JobIdModel {
  id: number;
  requestToHire: RequestToHireModel;
  boardTemplate: BoardTemplateModel;
  title: string;
  department: DepartmentModel;
  businessUnit: PicklistItemModel;
  requester: UserModel;
  jobRole: JobRoleModel;
  roleLevel: PicklistItemModel;
  roleTaskDescription: string;
  jobLocationType: PicklistItemModel;
  jobLocation: BranchModel;
  employmentStatus: PicklistItemModel;
  minimumQualifications: string;
  preferredQualifications: string;
  benefits: string;
  specialCategoriesOpened: boolean;
  status: PicklistItemModel;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    requestToHire: RequestToHireModel,
    boardTemplate: BoardTemplateModel,
    title: string,
    department: DepartmentModel,
    businessUnit: PicklistItemModel,
    requester: UserModel,
    jobRole: JobRoleModel,
    roleLevel: PicklistItemModel,
    roleTaskDescription: string,
    jobLocationType: PicklistItemModel,
    jobLocation: BranchModel,
    employmentStatus: PicklistItemModel,
    minimumQualifications: string,
    preferredQualifications: string,
    benefits: string,
    specialCategoriesOpened: boolean,
    status: PicklistItemModel,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.requestToHire = requestToHire;
    this.boardTemplate = boardTemplate;
    this.title = title;
    this.department = department;
    this.businessUnit = businessUnit;
    this.requester = requester;
    this.jobRole = jobRole;
    this.roleTaskDescription = roleTaskDescription;
    this.roleLevel = roleLevel;
    this.jobLocationType = jobLocationType;
    this.jobLocation = jobLocation;
    this.employmentStatus = employmentStatus;
    this.minimumQualifications = minimumQualifications;
    this.preferredQualifications = preferredQualifications;
    this.benefits = benefits;
    this.specialCategoriesOpened = specialCategoriesOpened;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getRequestToHire(): RequestToHireModel {
    return this.requestToHire;
  }

  getBoardTemplate(): BoardTemplateModel {
    return this.boardTemplate;
  }

  getTitle(): string {
    return this.title;
  }

  getDepartment(): DepartmentModel {
    return this.department;
  }

  getBusinessUnit(): PicklistItemModel {
    return this.businessUnit;
  }

  getRequester(): UserModel {
    return this.requester;
  }

  getJobRole(): JobRoleModel {
    return this.jobRole;
  }

  getRoleTaskDescription(): string {
    return this.roleTaskDescription;
  }

  getRoleLevel(): PicklistItemModel {
    return this.roleLevel;
  }

  getJobLocationType(): PicklistItemModel {
    return this.jobLocationType;
  }

  getJobLocation(): BranchModel {
    return this.jobLocation;
  }

  getEmploymentStatus(): PicklistItemModel {
    return this.employmentStatus;
  }

  getMinimumQualifications(): string {
    return this.minimumQualifications;
  }

  getPreferredQualifications(): string {
    return this.preferredQualifications;
  }

  getBenefits(): string {
    return this.benefits;
  }

  getSpecialCategoriesOpened(): boolean {
    return this.specialCategoriesOpened;
  }

  getStatus(): PicklistItemModel {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
