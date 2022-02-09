export class JobRoleModel {
  private id: number;
  private name: string;
  private roleAbout: string;
  private responsibilities: string;

  constructor(
    id: number,
    name: string,
    roleAbout: string,
    responsibilities: string
  ) {
    this.id = id;
    this.name = name;
    this.roleAbout = roleAbout;
    this.responsibilities = responsibilities;
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getRoleAbout(): string {
    return this.roleAbout;
  }
  getResponsibilities(): string {
    return this.responsibilities;
  }
  setRoleAbout(roleAbout: string): void {
    this.roleAbout = roleAbout;
  }
  setResponsibilities(responsibilities: string): void {
    this.responsibilities = responsibilities;
  }
}

export interface JobRoleDTO {
  id: number;
  name: string;
  roleAbout: string;
  responsibilities: string;
}
