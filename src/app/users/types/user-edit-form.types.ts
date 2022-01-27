export interface UserEditFormPicklist {
  companyLevels?: string[];
  departmentsValues?: string[];
  platformRoleValues?: string[];
}

export interface UserFormData {
  firstname: string;
  lastname: string;
  email: string;
  departments: string;
  companyLevels: string;
  platformRoles: string;
}
