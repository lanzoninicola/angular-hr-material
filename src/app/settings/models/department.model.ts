import { UserModel } from 'src/app/users/models/user.model';

export class DepartmentModel {
  private id: number;
  private name: string;
  private manager: UserModel;
  private teamLeads: UserModel[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getManager(): UserModel {
    return this.manager;
  }

  getTeamLeads(): UserModel[] {
    return this.teamLeads;
  }

  setManager(manager: UserModel): void {
    this.manager = manager;
  }

  setTeamLeads(teamLeads: UserModel[]): void {
    this.teamLeads = teamLeads;
  }
}
