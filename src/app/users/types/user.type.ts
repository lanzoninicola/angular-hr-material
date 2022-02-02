export interface UserModel {
  id?: number;
  firstname: string;
  lastname: string;
  fullName?: string;
  email: string;
  department?: string;
  companyRoleLevel?: string;
  recruitingRole: string;
  isAdmin: boolean | string;
}
