export interface RequestToHireHttpResponse {
  id: number;
  title: string;
  department: {
    id: number;
    name: string;
  };
  businessUnit: string; // picklist
  requester: UserRequester;
  jobRole: {
    id: number;
    name: string;
  };
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
  createdAt: string;
  updatedAt: string;
}

export interface UserRequester {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
