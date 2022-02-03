export class User {
  constructor(
    private _id: number,
    private _firstname: string,
    private _lastname: string,
    private _email: string,
    private _recruitingRole: string,
    private _department: string,
    private _companyRoleLevel: string,
    private _isAdmin: boolean
  ) {}

  public get id(): number {
    return this._id;
  }

  public get lastname(): string {
    return this._lastname;
  }

  public get firstname(): string {
    return this._firstname;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public get companyRoleLevel(): string {
    return this._companyRoleLevel;
  }

  public get department(): string {
    return this._department;
  }

  public get recruitingRole(): string {
    return this._recruitingRole;
  }

  public get email(): string {
    return this._email;
  }

  public get fullname(): string {
    return `${this._lastname} ${this._firstname}`;
  }
}
