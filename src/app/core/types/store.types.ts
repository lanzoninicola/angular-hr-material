import { BehaviorSubject } from 'rxjs';

export type Store = { [key: string]: any };

export interface StoreService {
  store$: BehaviorSubject<Store>;
  set: (key: string, value: any) => void;
  get: (key: string) => any;
}
