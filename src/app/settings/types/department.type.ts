import { UserDTO } from 'src/app/users/types/user.type';

export interface DepartmentDTO {
  id: number;
  name: string;
  manager: UserDTO;
  teamLeads: UserDTO[];
}
