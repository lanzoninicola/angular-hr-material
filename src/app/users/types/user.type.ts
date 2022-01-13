export interface UserHttpResponse {
  firstname: string;
  lastname: string;
  email: string;
}

export interface UserModel {
  id: number;
  firstname: string;
  lastname: string;
  fullName: string;
  email: string;
  department?: string;
  companyRoleLevel?: string;
  platformRole: string;
}
