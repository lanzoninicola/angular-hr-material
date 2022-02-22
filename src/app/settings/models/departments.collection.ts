import { DepartmentModel } from './department.model';

export class DepartmentsCollection {
  items: DepartmentModel[] = [];

  constructor(departments: DepartmentModel[]) {
    this.items = departments;
  }

  getItems(): DepartmentModel[] {
    return this.items;
  }

  findItemById(id: number): DepartmentModel {
    return (
      this.items.find((item) => item.getId() === id) || ({} as DepartmentModel)
    );
  }
}
