export interface RequestToHireModel {
  id: number;
  title: string;
  departmentId: string;
  businessUnit: string; // picklist
  requestId: string;
  jobRoleId: string;
  roleTaskDescription: string; // long description
  roleLevel: string; // picklist
  highPriority: boolean;
  jobLocationType: string; // picklist
  jobLocationId: string; // model
  employmentStatus: string; // picklist
  minimumQualifications: string; // long description
  preferredQualifications: string; // long description
  benefits: string; // long description
  budget: string;
  specialCategoriesOpened: boolean;
  additionalNotes: boolean; // long description
  status: string;
}
