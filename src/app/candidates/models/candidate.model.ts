export class CandidateModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
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

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getAddress(): string {
    return this.address;
  }

  getZipCode(): string {
    return this.zipCode;
  }

  getCity(): string {
    return this.city;
  }

  getState(): string {
    return this.state;
  }

  getCountry(): string {
    return this.country;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getLastname(): string {
    return this.lastname;
  }
}
