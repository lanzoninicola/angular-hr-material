import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';
import { Store, StoreService } from 'src/app/core/types/store.types';

@Injectable({
  providedIn: 'root',
})
export abstract class ModuleStoreService implements StoreService {
  private _store: Store = {};
  private _newStore: Store = {};

  /**
   * @description Responsible to dispatch the new Store
   * You might subscribe to it if necessary
   */
  readonly dispatcher: BehaviorSubject<any>;

  constructor() {
    this.dispatcher = new BehaviorSubject(this._store);
  }

  /**
   * @description Returns the value from the store
   * @param key - The key that identifiers the store value
   * @param value - The value to store
   */
  set(key: string, value: any): void {
    this._newStore = this._cloneStore();

    this._newStore[key] = value;

    this._mergeStores();

    this.dispatch(this._newStore);

    this._clean(this._newStore);
  }

  /**
   * @description Returns the value from the store synchronously
   * @param key | optional. If not return the store
   */
  get(key?: string): any | null {
    const currentStore = this.dispatcher.value;

    if (!key) {
      return currentStore;
    }

    if (!currentStore.hasOwnProperty(key)) {
      return null;
    }

    return currentStore[key];
  }

  /**
   * @description Returns the value from the store
   * @param key | optional
   */
  dispatch(newStore: Store) {
    this.dispatcher.next(newStore);
  }

  /**
   * @description Remove the key from the store
   *
   */
  reset(key: string) {
    if (!this._store.hasOwnProperty(key)) {
      return;
    }

    this._newStore = this._cloneStore();

    delete this._newStore[key];

    this._replaceStore();

    this.dispatch(this._newStore);

    this._clean(this._newStore);
  }

  /**
   * @description Make a copy of store
   */
  private _cloneStore() {
    return { ...this._store };
  }

  /**
   * @description Merge the current store with the new store
   */
  private _mergeStores() {
    this._store = { ...this._store, ...this._newStore };
  }

  /**
   * @description Replace the current store with the new store
   */
  private _replaceStore() {
    this._store = { ...this._newStore };
  }

  /**
   * @description Reset the store given
   */
  private _clean(store: Store) {
    store = {};
  }
}
