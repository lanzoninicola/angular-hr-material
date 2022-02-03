export class User {
  private id: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private recruitingRole: string;
  private department: string;
  private companyRoleLevel: string;
  private isAdmin: boolean;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    recruitingRole: string,
    department: string,
    companyRoleLevel: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.recruitingRole = recruitingRole;
    this.department = department;
    this.companyRoleLevel = companyRoleLevel;
    this.isAdmin = isAdmin;
  }

  getId(): number {
    return this.id;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  getEmail(): string {
    return this.email;
  }

  getRecruitingRole(): string {
    return this.recruitingRole;
  }

  getDepartment(): string {
    return this.department;
  }

  getCompanyRoleLevel(): string {
    return this.companyRoleLevel;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  get fullname(): string {
    return `${this.lastname} ${this.firstname}`;
  }
}
