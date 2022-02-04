export class JobRoleModel {
  private id: number;
  private name: string;
  private roleAbout: string;
  private responsibilities: string;

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
