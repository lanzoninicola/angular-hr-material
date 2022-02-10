import { PicklistValue } from 'src/app/core/types/picklist.type';
import { BranchModel } from 'src/app/settings/models/branch.model';
import { DepartmentModel } from 'src/app/settings/models/department.model';
import { JobRoleModel } from 'src/app/settings/models/job-role.model';
import { UserModel } from 'src/app/users/models/user.model';
import { RTHStatus } from '../types/request-to-hire.type';

//TODO: separate the model into head and body

export class RequestToHireModel {
  private id: number;
  private title: string;
  private department: DepartmentModel;
  private businessUnit: PicklistValue;
  private requester: UserModel;
  private jobRole: JobRoleModel;
  private roleTaskDescription: string; // long description
  private roleLevel: PicklistValue;
  private highPriority: boolean;
  private jobLocationType: PicklistValue;
  private jobLocation: BranchModel;
  private employmentStatus: PicklistValue;
  private minimumQualifications: string; // long description
  private preferredQualifications: string; // long description
  private benefits: string; // long description
  private budget: string;
  private specialCategoriesOpened: boolean;
  private additionalNotes: string; // long description
  private status: RTHStatus;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    title: string,
    department: DepartmentModel,
    businessUnit: PicklistValue,
    requester: UserModel,
    jobRole: JobRoleModel,
    roleTaskDescription: string,
    roleLevel: PicklistValue,
    highPriority: boolean,
    jobLocationType: PicklistValue,
    jobLocation: BranchModel,
    employmentStatus: PicklistValue,
    minimumQualifications: string,
    preferredQualifications: string,
    benefits: string,
    budget: string,
    specialCategoriesOpened: boolean,
    additionalNotes: string,
    status: RTHStatus,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.department = department;
    this.businessUnit = businessUnit;
    this.requester = requester;
    this.jobRole = jobRole;
    this.roleTaskDescription = roleTaskDescription;
    this.roleLevel = roleLevel;
    this.highPriority = highPriority;
    this.jobLocationType = jobLocationType;
    this.jobLocation = jobLocation;
    this.employmentStatus = employmentStatus;
    this.minimumQualifications = minimumQualifications;
    this.preferredQualifications = preferredQualifications;
    this.benefits = benefits;
    this.budget = budget;
    this.specialCategoriesOpened = specialCategoriesOpened;
    this.additionalNotes = additionalNotes;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDepartment(): DepartmentModel {
    return this.department;
  }

  getBusinessUnit(): string {
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

  getRoleLevel(): string {
    return this.roleLevel;
  }

  getHighPriority(): boolean {
    return this.highPriority;
  }

  getJobLocationType(): string {
    return this.jobLocationType;
  }

  getJobLocation(): BranchModel {
    return this.jobLocation;
  }

  getEmploymentStatus(): string {
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

  getBudget(): string {
    return this.budget;
  }

  getSpecialCategoriesOpened(): boolean {
    return this.specialCategoriesOpened;
  }

  getAdditionalNotes(): string {
    return this.additionalNotes;
  }

  getStatus(): RTHStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
