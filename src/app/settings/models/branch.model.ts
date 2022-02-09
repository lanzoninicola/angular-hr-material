export class BranchModel {
  private id: number;
  private name: string;
  private street: string;
  private city: string;
  private country: string;
  private timezone: string;

  constructor(
    id: number,
    name: string,
    street: string,
    city: string,
    country: string,
    timezone: string
  ) {
    this.id = id;
    this.name = name;
    this.street = street;
    this.city = city;
    this.country = country;
    this.timezone = timezone;
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getStreet(): string {
    return this.street;
  }
  getCity(): string {
    return this.city;
  }
  getCountry(): string {
    return this.country;
  }
  getTimezone(): string {
    return this.timezone;
  }
}

export interface BranchDTO {
  id: number;
  name: string;
  street: string;
  city: string;
  country: string;
  timezone: string;
}
