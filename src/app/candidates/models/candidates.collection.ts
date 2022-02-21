import { CandidateModel } from './candidate.model';

export class CandidatesCollection {
  items: CandidateModel[] = [];

  constructor(candidates: CandidateModel[]) {
    this.items = candidates;
  }

  getItems(): CandidateModel[] {
    return this.items;
  }

  findItemById(id: number): CandidateModel {
    return (
      this.items.find((item) => item.getId() === id) || ({} as CandidateModel)
    );
  }
}
