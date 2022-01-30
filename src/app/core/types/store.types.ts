import { BehaviorSubject } from 'rxjs';

export type Store = { [key: string]: any };

export interface StoreService {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
  dispatch: (newStore: Store) => void;
}
