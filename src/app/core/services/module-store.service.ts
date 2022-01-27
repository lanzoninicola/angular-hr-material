import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';
import { Store, StoreService } from 'src/app/core/types/store.types';

@Injectable({
  providedIn: 'root',
})
export abstract class ModuleStoreService implements StoreService {
  store$: BehaviorSubject<Store> = new BehaviorSubject<Store>({});
  storeValue$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  get value() {
    return this.store$.value;
  }

  set(key: string, value: any): void {
    const sub = combineLatest([this.store$, of({ [key]: value })]).subscribe(
      ([currentStore, newState]) => {
        currentStore[key] = newState[key];
      }
    );

    sub.unsubscribe();
  }

  get(key: string): BehaviorSubject<any> {
    const _storeValue$ = this.store$.pipe(
      map((currentStore) => {
        if (currentStore.hasOwnProperty(key)) {
          return currentStore[key];
        }
      })
    );

    const sub = _storeValue$.subscribe((data) => this.storeValue$.next(data));
    sub.unsubscribe();

    return this.storeValue$;
  }
}
