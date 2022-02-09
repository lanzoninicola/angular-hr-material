import { UserModel } from 'src/app/users/models/user.model';

export interface DepartmentDTO {
  id: number;
  name: string;
  manager: UserModel;
  teamLeads: UserModel[];
}
