export class CandidateModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getFullName(): string {
    return `${this.lastname} ${this.firstname}`;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }
}
