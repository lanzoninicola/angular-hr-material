import { UserModel } from './user.model';

export class UsersCollection {
  items: UserModel[] = [];

  constructor(users: UserModel[]) {
    this.items = users;
  }

  getItems(): UserModel[] {
    return this.items;
  }

  findItemById(id: number): UserModel {
    return this.items.find((item) => item.getId() === id) || ({} as UserModel);
  }
}
